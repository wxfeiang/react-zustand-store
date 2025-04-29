import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef, TableProps } from 'antd';
import { Button, Form, Input, Select, Switch, Table, } from 'antd';
type FormInstance<T> = GetRef<typeof Form<T>>;


const EditableContext = React.createContext<FormInstance<unknown> | null>(null);

interface Item {
  key: string;
  name: string;
  value: string;
  position: string;
  status: boolean;

}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const switchRef = useRef<SwitchRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  }
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  }
  let childNode = children;
  if (editable) {
    if (editing) {
      if (dataIndex === 'status') {
        childNode = (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[{ required: true, message: `${title} is required.` }]}
          >
            <Switch defaultChecked onChange={onChange} ref={switchRef} />
          </Form.Item>
        )
      } else if (dataIndex === 'position') {
        childNode = (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[{ required: true, message: `${title} is required.` }]}
          >
            <Select
              defaultValue="Header"
              onChange={handleChange}
              className='w-100%!'
              options={[
                { value: 'Header', label: 'Header' },
                { value: 'Body', label: 'Body' },
                { value: 'Query', label: 'Query', disabled: true },
                { value: 'Cookle', label: 'Cookle', disabled: true },
              ]}
            />
          </Form.Item>
        )
      } else {
        childNode = (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[{ required: true, message: `${title} is required.` }]}
          >
            <Input ref={inputRef} onPressEnter={save} onBlur={save} placeholder='请输入' />
          </Form.Item>
        )
      }
    } else {
      childNode = (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingInlineEnd: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      )
    }
  }
  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  key: React.Key;
  name: string;
  value: string;
  position: string;
  status: boolean;


}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

interface ListProps {
  data: DataType[];
  update: (data: DataType[]) => void;

}

const List: React.FC<ListProps> = (props) => {
  const [dataSource, setDataSource] = useState<DataType[]>(props.data);

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '参数key',
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: '入参位置',
      dataIndex: 'position',
      width: '20%',
      editable: true,
    },
    {
      title: '默认值',
      dataIndex: 'value',
      editable: true,
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      editable: true,
    },
  ];
  const [count, setCount] = useState(props.data.length + 1);

  const handleAdd = () => {
    const newData: DataType = {
      key: `key  ${count}`,
      name: "name",
      position: 'header',
      value: "val",
      status: true,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    // 存储到本地
    console.log('🍱', newData);
    props.update(newData);


  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    console.log('🥥[col]:', col);
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,

        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        新增参数
      </Button>
      <Table<DataType>
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
      />
      <div className='mt-[10px]'>点击单元格即可编辑</div>
    </div>
  );
};

export default List;