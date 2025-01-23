import UserForm from "../components/UserForm";
import UsersList from "../components/UsersList";

export default function page() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-center mx-auto">
        <div className="mt-12 px-8 w-full md:w-1/2">
          <h1 className="text-4xl font-bold pb-12 text-center">
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
