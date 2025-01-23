import UserForm from "../components/UserForm";
import UsersList from "../components/UsersList";

export default function page() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto flex justify-center">
        <div className="mt-12 w-full px-8 md:w-1/2">
          <h1 className="pb-12 text-center text-4xl font-bold">
            User Management
          </h1>
          <div className="space-y-12">
            <UserForm />
            <UsersList />
          </div>
        </div>
      </div>
    </div>
  );
}
