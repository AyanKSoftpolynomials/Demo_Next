"use client";

import React, { useState } from "react";
import { Users, UserPlus, ShieldAlert, Check, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { mockUsers } from "@/lib/mock-data";
import type { User, UserRole } from "@/types";

export default function UserManagementPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRoleChange = () => {
    if (!editingUser) return;
    
    setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, role: selectedRole } : u));
    toast({
      title: "Role Updated",
      description: `Successfully changed ${editingUser.name}'s role to ${selectedRole.toUpperCase()}`,
    });
    setDialogOpen(false);
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setSelectedRole(user.role);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">User Administration</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Control user security scopes. Audit platform logs, change roles, or suspend user credentials.
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User Account
        </Button>
      </div>

      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600" />
            Registered Users List
          </CardTitle>
          <CardDescription>Review and modify credentials and permission roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Active Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-mono text-xs text-slate-400">{user.id}</TableCell>
                    <TableCell className="font-bold text-slate-900 dark:text-white">{user.name}</TableCell>
                    <TableCell className="text-xs text-slate-500">{user.email}</TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        user.role === "admin"
                          ? "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400"
                          : user.role === "instructor"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-400"
                      }`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(user)}
                        className="text-xs"
                      >
                        Modify Role
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Role Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md bg-white dark:bg-slate-950">
          <DialogHeader>
            <DialogTitle>Edit User Security Role</DialogTitle>
            <DialogDescription>
              Modify access permissions for {editingUser?.name}. Changes take effect immediately.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-select">Access Permissions Role</Label>
              <select
                id="role-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-white"
              >
                <option value="student" className="text-slate-800">Student</option>
                <option value="instructor" className="text-slate-800">Instructor</option>
                <option value="admin" className="text-slate-800">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4 border-t border-slate-100 dark:border-slate-800 pt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRoleChange} className="bg-indigo-600 hover:bg-indigo-700">
              Save Role Permissions
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
