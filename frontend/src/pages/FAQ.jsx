import { useState } from "react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleContent = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className=" mt-32 flex flex-col items-center">
      <h1 className="text-4xl mb-12 font-semibold text-[#4e557a]">FAQ</h1>
      <div className="flex ">
        <button
          type="button"
          onClick={() => toggleContent(0)}
          className="shadow-md shadow-[#4e557a] border-[#4e557a] border-2  focus:outline-none p-4 rounded-md mb-4 w-[70vw]  "
        >
          <h1 className="font-semibold mb-2">Pourquoi ce site ?</h1>
          <div className={`${activeIndex === 0 ? "block" : "hidden"} mb-2 `}>
            <h3>
              Ce site me permet de partager mes réalisations avec un large
              public et de pouvoir interagir avec lui.
            </h3>
            <p>Pour cela, connecte toi !!!</p>
          </div>
        </button>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => toggleContent(1)}
          className="shadow-md shadow-[#4e557a] border-[#4e557a] border-2  focus:outline-none p-4 rounded-md mb-4 w-[70vw] "
        >
          <h1 className="font-semibold mb-2">Comment se connecter ?</h1>
          <div className={`${activeIndex === 1 ? "block" : "hidden"} mb-2 `}>
            <h3>
              Pour commencer, crée un compte si ce n'est pas déjà fait. Remplis
              toutes les données nécessaires. Ensuite, tu seras automatiquement
              redirigé vers la page de connexion où tu devras saisir ton adresse
              e-mail et ton mot de passe.
            </h3>
          </div>
        </button>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => toggleContent(2)}
          className="shadow-md shadow-[#4e557a] border-[#4e557a] border-2  focus:outline-none p-4 rounded-md mb-4  w-[70vw]"
        >
          <h1 className="font-semibold mb-2">Tu es enfin connecté ?!</h1>
          <div className={`${activeIndex === 2 ? "block" : "hidden"} mb-2 `}>
            <h3>
              Maintenant, tu as un accès à la fiche personnelle de chacune des
              réalisations. Tu pourras laisser un commentaire si tu le
              souhaites. Tu pourras également mettre à jour ton profil. Tu
              souhaites supprimer ton compte ? Contacte-moi !
            </h3>
          </div>
        </button>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => toggleContent(3)}
          className="shadow-md shadow-[#4e557a] border-[#4e557a] border-2  focus:outline-none p-4 rounded-md mb-4 w-[70vw] "
        >
          <h1 className="font-semibold mb-2">Tu souhaites me contacter ?</h1>
          <div className={`${activeIndex === 3 ? "block" : "hidden"} mb-2 `}>
            <h3>
              Tu as besoin de renseignements concernant une réalisation, ton
              compte ou autre ? L'onglet 'Contact' te permettra de m'envoyer un
              message directement à mon adresse e-mail
            </h3>
          </div>
        </button>
      </div>
    </div>
  );
}
