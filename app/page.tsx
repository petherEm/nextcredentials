import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black h-screen flex items-center justify-center">
      <div className="w-1/3 flex items-center justify-center">
        <h1 className="text-[62px] text-center text-white font-extrabold">
          Hello - This is super secret dashboard.
        </h1>
      </div>
    </main>
  );
}
