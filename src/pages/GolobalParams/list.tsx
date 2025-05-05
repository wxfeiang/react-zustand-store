import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef, TableProps } from 'antd';
import { Button, Form, Input, Select, Switch, Table, } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { uid } from "radash";

type FormInstance<T> = GetRef<typeof Form<T>>;


const EditableContext = React.createContext<FormInstance<Item> | null>(null);

interface Item {
  key: string;
  name: string;
  value: string;
  position: string;
  status: boolean;
}


const EditableRow: React.FC<Item> = ({ ...props }) => {
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

  let childNode = children;
  if (editable) {
    if (editing) {
      if (dataIndex === 'position') {
        childNode = (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[{ required: true, message: `${title} is required.` }]}
          >
            <Select
              onChange={save}
              onBlur={save}
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
  position: "Header"| "Body" | "Query";
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
      width: 200,
      editable: true,
    },
    {
      title: '入参位置',
      dataIndex: 'position',
      width: 200,
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
      width: 120,
      render: (_, record) => (
        <Switch
          checked={record.status}
          checkedChildren="是" unCheckedChildren="否"
          onChange={(checked) => handleSwitchChange(checked, record)}
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 120,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <DeleteOutlined className="color-[#eb2f96]" onClick={() => handleDelete(record.key)}/>
        ) : null,
    },
  ];
  const [count, setCount] = useState(uid(8));
  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      name: `name ${count}`,
      position: 'Header',
      value: "val",
      status: true,
    };
    setDataSource([...dataSource, newData]);
    setCount(uid(8));
  };
  const handleSwitchChange =(check:boolean,row: DataType)=>{
    row = {...row , status: check}
    handleSave(row)
  }
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
    props.update(newData);
  };
  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    props.update(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {

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
        scroll={{ x: 'max-content', y: 300 }}
      />
    </div>
  );
};

export default List;