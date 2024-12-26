import React, { useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Button,
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

const ManageUsers = () => {
  const { data: users } = UseViewUsers() || { data: [] };
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<LifestreamUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("user");

  const widthArr = [150, 300, 120, 180];
  const tableHead = ["Name", "Email", "Role", "Actions"];


  const roleChangeMutation = UseChangeRole();
  const deleteUserMutation = UseDeleteUser();
  const openEditDialog = (user: LifestreamUser) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setEditModalVisible(true);
  };

  const openViewDialog = (user: LifestreamUser) => {
    setSelectedUser(user);
    setViewModalVisible(true);
  };

  const handleSaveRole = () => {

    if (selectedUser) {
      const userRoleData: UserRoleData = {
        role: selectedRole,
        _id: selectedUser._id,
      };

      roleChangeMutation.mutate(userRoleData, {
        onSuccess: () => {
          setEditModalVisible(false);
        },
        onError: (error) => {
          console.error("Failed to change role:", error);
        },
      });
    }
   
  };


  const handleRemoveUser = (userId:string)=>{
deleteUserMutation.mutate(userId);
  }

  const renderActions = (user: LifestreamUser) => (
    <View style={styles.actions} key={user._id}>
      <TouchableOpacity onPress={() => openEditDialog(user)}>
        <Pencil size={20} color="#007bff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemoveUser(user?._id)}>
        <Trash2 size={20} color="#dc3545" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openViewDialog(user)}>
        <EllipsisVertical size={20} color="#6c757d" />
      </TouchableOpacity>
    </View>
  );

  const tableData =
    users?.data?.map((user: LifestreamUser) => [
      user.name,
      user.email,
      user.role,
      () => renderActions(user),
    ]) || [];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View>
        <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
          <Row
            data={tableHead}
            widthArr={widthArr}
            style={styles.head}
            textStyle={styles.text}
          />
        </Table>
        <ScrollView style={styles.dataWrapper}>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            {tableData.map(
              (rowData: (string | (() => JSX.Element))[], index: number) => (
                <Row
                  key={index}
                  data={rowData.map((cellData: string | (() => JSX.Element)) =>
                    typeof cellData === "function" ? cellData() : cellData
                  )}
                  widthArr={widthArr}
                  style={[
                    styles.row,
                    index % 2 ? { backgroundColor: "#F7F6E7" } : null,
                  ]}
                  textStyle={styles.text}
                />
              )
            )}
          </Table>
        </ScrollView>
      </View>
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
              <Picker.Item label="Receiptant" value="receiptant" />
            </Picker>
            <Button title="Save" onPress={handleSaveRole}  color={'#ef4444'}  />
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
                  id: selectedUser?.email
                    ? bs64.encode(selectedUser.email)
                    : "",
                },
              }}
              style={styles.button}
            >
              View History
            </Link>
            <Button
              title="Close"
              onPress={() => setViewModalVisible(false)}
              color={"#ef4444"}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  head: { height: 50, backgroundColor: "#f1f8ff" },
  text: { margin: 6, textAlign: "center" },
  dataWrapper: { marginTop: -1 },
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
