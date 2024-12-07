import UserForm from "@/components/ui/UserForm";
import UsersList from "@/components/ui/UsersList";

export default function Home() {
  return (
    <div className="flex justify-center mx-auto">
      <div className="mt-12 px-8">
        <h1 className="text-4xl font-bold pb-12 text-center">
          User Management
        </h1>
        <div className="space-y-12">
          <UserForm />
          <UsersList />
        </div>
      </div>
    </div>
  );
}
