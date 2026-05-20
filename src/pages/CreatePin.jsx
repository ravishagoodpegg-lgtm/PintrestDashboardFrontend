import CreatePinForm from '../components/forms/CreatePinForm';

export default function CreatePin() {
  return (
    <div className="max-w-xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6">Create Pin</h2>
      <CreatePinForm />
    </div>
  );
}