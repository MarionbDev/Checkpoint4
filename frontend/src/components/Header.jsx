import { useUserContext } from "../contexts/UserContext";

export default function Header() {
  const [{ user }] = useUserContext();
  return (
    <div className="flex">
      {user && (
        <div className="flex items-center gap-3">
          <p className="text-xs sm:text-lg lg:text-xl">
            Bienvenue {user.firstname}
          </p>
        </div>
      )}
    </div>
  );
}
