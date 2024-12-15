import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetAllAccount } from '../../../api/AccountApi.js';
import { checkToken } from '../../../api/Url.js'; // Import the checkToken function

function AccountManager() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [userRole, setUserRole] = useState(null); // State to store the user's role

  // Fetch the role from token on page load
  useEffect(() => {
    const { isValid, userRole } = checkToken(); // Extract role using checkToken
    if (isValid) {
      setUserRole(userRole);
    } else {
      toast.error('Unauthorized access! Redirecting...');
      // Redirect or prevent access logic can be implemented here
      window.location.href = '/unauthorized';
    }
  }, []);

  // Fetch data for the table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await GetAllAccount();
        console.log("API Response:", apiData); // Log for debugging
        if (apiData && apiData.result) {
          setData(apiData.result); // Set the data to the result array
        } else {
          setData([]); // Default to an empty array if result is undefined
        }
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching accounts: " + error.message);
        setData([]); // Prevent crash by defaulting to an empty array
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // ... existing code ...
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: '10%' },
    {
      title: 'First Name', dataIndex: 'firstName', key: 'firstName',
      render: (text) => text === null ? <span style={{ color: 'red' }}>X</span> : text
    },
    {
      title: 'Last Name', dataIndex: 'lastName', key: 'lastName',
      render: (text) => text === null ? <span style={{ color: 'red' }}>X</span> : text
    },
    {
      title: 'Email', dataIndex: 'email', key: 'email',
      render: (text) => text === null ? <span style={{ color: 'red' }}>X</span> : text
    },
    {
      title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber',
      render: (text) => text === null ? <span style={{ color: 'red' }}>X</span> : text
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        switch (role) {
          case 0: return 'Customer';
          case 1: return 'Sales Staff';
          case 2: return 'Delivering Staff';
          case 3: return 'Manager';
          default: return 'Unknown';
        }
      },
      filters: [
        { text: 'Customer', value: 0 },
        { text: 'Sales Staff', value: 1 },
        { text: 'Delivering Staff', value: 2 },
        { text: 'Manager', value: 3 },
      ],
      onFilter: (value, record) => record.role === value,
    },
  ];
  // ... existing code ...

  const filteredData = Array.isArray(data)
    ? data.filter((account) =>
      account.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];



  return (
    <>
      <ToastContainer />
      <div>
        {userRole === 'Manager' ? (
          <>
            <h1 className="section-title">Manage Accounts</h1>

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
              rowKey="id"
              pagination={{
                pageSize: 5,
                showSizeChanger: false,
                total: filteredData.length,
              }}
            />
          </>
        ) : (
          <h2 style={{ color: 'red' }}>You are not authorized to access this page.</h2>
        )}

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
