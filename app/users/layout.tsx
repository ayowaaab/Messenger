import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";
import SideBar from "../components/sidebar/SideBar";

export default async function usersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <SideBar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </SideBar>
  );
}
