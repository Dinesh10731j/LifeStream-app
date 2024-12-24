import React from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { UseViewUsers } from '@/hooks/useViewUsers';
import { Pencil, Trash2, Ellipsis } from 'lucide-react-native';  

import { LifestreamUser } from '@/Types';

type UserActionHandler = (userId: string) => void;

const ManageUsers: React.FC = () => {
  const { data: users } = UseViewUsers();
  const tableHead = ['Name', 'Email', 'Role', 'Actions'];
  const widthArr = [150, 300, 120, 150];  

  const tableData = users?.data?.map((user: LifestreamUser) => ([
    user.name,
    user.email,
    user.role,
    <View style={styles.actions} key={user._id}>
      <TouchableOpacity onPress={() => handleEdit(user)}>
        <Pencil size={20} color="#007bff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(user._id)}>
        <Trash2 size={20} color="#dc3545" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleViewHistory(user._id)}>
        <Ellipsis size={20} color="#6c757d" />
      </TouchableOpacity>
    </View>
  ]));

  const handleEdit = (user: LifestreamUser) => {
    console.log('Edit User:', user);
  };

  const handleDelete: UserActionHandler = (userId) => {
    console.log('Delete User ID:', userId);
  };

  const handleViewHistory: UserActionHandler = (userId) => {
    console.log('View History for User ID:', userId);
  };

  return (
    <SafeAreaView style={styles.userContainer}>
      <ScrollView horizontal>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.head}
              textStyle={styles.text}
            />
            {
              tableData?.map((rowData:[], index:number) => (
                <TableWrapper key={index} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={cellData}
                      width={widthArr[cellIndex]}
                      textStyle={styles.text}
                    />
                  ))}
                </TableWrapper>
              ))
            }
          </Table>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  head: {
    height: 50,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    height: 60,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default ManageUsers;
