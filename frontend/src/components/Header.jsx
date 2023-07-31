import { useUserContext } from "../contexts/UserContext";

export default function Header() {
  const [{ user }] = useUserContext();
  return (
    <div className="">
      {user && (
        <div className="flex items-center gap-3">
          <p className="text-base">Bienvenue {user.firstname}</p>
        </div>
      )}
    </div>
  );
}
