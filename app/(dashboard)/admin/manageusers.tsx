import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Button,
  ScrollView,
  Alert
} from "react-native";
import { Table, Row } from "react-native-table-component";
import { Pencil, Trash2, EllipsisVertical } from "lucide-react-native";
import { UseViewUsers } from "@/hooks/useViewUsers";
import { LifestreamUser } from "@/Types";
import { Link } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import bs64 from "react-native-base64";
import { UseChangeRole } from "@/hooks/useChangeRole";
import { UseDeleteUser } from "@/hooks/useDeleteUser";
import { UserRoleData } from "@/Types";
import Toast from "react-native-toast-message";

const ManageUsers = () => {
  const { data: users, isLoading, error } = UseViewUsers();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<LifestreamUser<string> | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("user");

  const roleChangeMutation = UseChangeRole();
  const deleteUserMutation = UseDeleteUser();

  const openEditDialog = (user: LifestreamUser<string>) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setEditModalVisible(true);
  };

  const openViewDialog = (user: LifestreamUser<string>) => {
    setSelectedUser(user);
    setViewModalVisible(true);
  };

  const handleSaveRole = () => {
    if (selectedUser && selectedRole) {
      const userRoleData: UserRoleData = {
        role: selectedRole,
        _id: selectedUser._id,
      };

      roleChangeMutation.mutate(userRoleData, {
        onSuccess: () => {
          setEditModalVisible(false);
          Toast.show({
            text1: "Success",
            text1Style: { fontSize: 20 },
            text2: `Role updated to ${selectedRole}`,
          });
        },
        onError: (error) => {
          Toast.show({
            text1: "Error",
            text1Style: { fontSize: 20 },
            text2: error.message,
          });
        },
      });
    }
  };

  const handleRemoveUser = (userId: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteUserMutation.mutate(userId, {
              onSuccess: () => {
                Toast.show({
                  text1: "Success",
                  text1Style: { fontSize: 20 },
                  text2: "User deleted successfully",
                });
              },
              onError: (error) => {
                Toast.show({
                  text1: "Error",
                  text1Style: { fontSize: 20 },
                  text2: error.message,
                });
              },
            });
          },
        },
      ]
    );
  };

  const renderActions = (user: LifestreamUser<string>) => (
    <View style={styles.actions} key={user._id}>
      <TouchableOpacity onPress={() => openEditDialog(user)}>
        <Pencil size={20} color="#007bff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemoveUser(user._id)}>
        <Trash2 size={20} color="#dc3545" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openViewDialog(user)}>
        <EllipsisVertical size={20} color="#6c757d" />
      </TouchableOpacity>
    </View>
  );

  // Ensure users.data exists before rendering the table
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading users: {error.message}</Text>;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
          <Row
            data={["Name", "Email", "Role", "Actions"]}
            widthArr={[150, 300, 120, 180]}
            style={styles.head}
          />
         
          {users?.data && users.data ? (
            users.data.map((item: any) => (
              <Row
                key={item._id}
                data={[item.name, item.email, item.role, renderActions(item)]}
                widthArr={[150, 300, 120, 180]}
                style={styles.row}
              />
            ))
          ) : (
            <Text>No users found.</Text>
          )}
        </Table>

        {/* Edit Role Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Edit Role for {selectedUser?.name}
              </Text>
              <Picker
                selectedValue={selectedRole}
                onValueChange={(itemValue) => setSelectedRole(itemValue)}
              >
                <Picker.Item label="Donor" value="donor" />
                <Picker.Item label="Admin" value="admin" />
                <Picker.Item label="Recipient" value="recipient" />
              </Picker>
              <Button title="Save" onPress={handleSaveRole} color={'#ef4444'} />
              <Button title="Cancel" onPress={() => setEditModalVisible(false)} color={'#ef4444'} />
            </View>
          </View>
        </Modal>

        {/* View User Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={viewModalVisible}
          onRequestClose={() => setViewModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>User Details</Text>
              <Text style={styles.modalText}>{selectedUser?.name}</Text>
              <Text style={styles.modalText}>{selectedUser?.email}</Text>

              <Link
                href={{
                  pathname: "/userhistory/[id]",
                  params: {
                    id: selectedUser?.email ? bs64.encode(selectedUser.email) : "",
                  },
                }}
                style={styles.button}
              >
                View History
              </Link>
              <Button
                title="Close"
                onPress={() => setViewModalVisible(false)}
                color={'#ef4444'}
              />
            </View>
          </View>
        </Modal>
        <Toast />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  head: { height: 50, backgroundColor: "#f1f8ff" },
  text: { margin: 6, textAlign: "center" },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  actions: { flexDirection: "row", justifyContent: "space-around" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalText: { marginBottom: 15, textAlign: "center", fontSize: 18 },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 7,
    backgroundColor: "#ef4444",
    textAlign: "center",
    color: "#fff",
  },
});

export default ManageUsers;
