import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Checkbox } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetAllAccount } from '../../../api/AccountApi.js'

function AccountManager() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [form] = Form.useForm();

  //Effect to set the data and loading state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await GetAllAccount(); // Fetch data from API
        setData(apiData);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching accounts: " + error.message);
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  // const openAddModal = () => {
  //   form.resetFields();
  //   setFormData(null);
  //   setShowForm(true);
  // };

  // const openEditModal = (record) => {
  //   setFormData(record);
  //   form.setFieldsValue(record);
  //   setShowForm(true);
  // };

  // const handleEdit = async (values) => {
  //   // Construct profileData using the values from the form
  //   const profileData = {
  //     phone: values.phone,
  //     email: values.email,
  //     address: values.address,
  //   };

  //   try {
  //     // Call the UpdateAccount function with the account ID and profileData
  //     const response = await UpdateProfile(profileData); // Ensure formData contains the accountId

  //     if (response.success) {
  //       toast.success("Account updated successfully!");
  //       setShowForm(false);
  //       GetAllAccount(); // Refresh the data to reflect changes
  //     } else {
  //       toast.error("Failed to update account.");
  //     }
  //   } catch (error) {
  //     console.error('Error updating account:', error);
  //     toast.error("Error updating account: " + error.message);
  //   }
  // };

  // const handleSubmit = async (values) => {
  //   await handleEdit(values);
  // };

  const columns = [
    { title: 'Account ID', dataIndex: 'accountId', width: '19%' },
    { title: 'First Name', dataIndex: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phone' },
    {
      title: 'Verified',
      dataIndex: 'isEmailVerified',
      render: (verified) => (verified ? 'Yes' : 'No'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      filters: [
        { text: 'manager', value: 'manager' },
        { text: 'delivery', value: 'delivery' },
        { text: 'customer', value: 'customer' },
      ],
      onFilter: (value, record) => {
        return record.role && record.role === value;
      },
    }
  ];

  const filteredData = data.filter(account =>
    account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      <div>
        <h1 className='section-title'>Manage Accounts</h1>

        <Input
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px', width: '30%' }}
        />

        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          rowKey="accountId"
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            total: filteredData.length,
          }}
        />
        {/* Role Modal */}
        <Modal
          title="Account Roles"
          open={roleModalVisible}
          onCancel={() => setRoleModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setRoleModalVisible(false)}>
              Close
            </Button>,
          ]}
        >
          <Table
            columns={[
              { title: 'Role ID', dataIndex: 'roleId' },
              { title: 'Role Name', dataIndex: 'name' },
              {
                title: 'Is Disabled',
                dataIndex: 'isDisabled',
                render: (isDisabled) => (isDisabled ? 'Yes' : 'No'),
              },
            ]}
            dataSource={selectedRoles}
            rowKey="roleId"
            pagination={false}
          />
        </Modal>
      </div>
    </>
  );
}


export default AccountManager;