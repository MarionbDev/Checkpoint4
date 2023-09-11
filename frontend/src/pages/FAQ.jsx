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
    <div className=" mt-32 flex flex-col items-center min-h-screen">
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
            <p>Pour cela, connectez-vous !!!</p>
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
              Pour commencer, créez un compte si ce n'est pas déjà fait en
              remplissant toutes les données nécessaires. Ensuite, vous serez
              automatiquement redirigé vers la page de connexion où vous devrez
              saisir votre adresse e-mail et votre mot de passe.
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
          <h1 className="font-semibold mb-2">Vous êtes connecté ?</h1>
          <div className={`${activeIndex === 2 ? "block" : "hidden"} mb-2 `}>
            <h3>
              À présent, vous avez accès à la fiche personnelle de chacune des
              réalisations. Vous pouvez laisser un commentaire si vous le
              souhaitez. Vous avez également la possibilité de mettre à jour
              votre profil. Si vous souhaitez supprimer votre compte, veuillez
              me contacter !
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
          <h1 className="font-semibold mb-2">Vous souhaiter me contacter ?</h1>
          <div className={`${activeIndex === 3 ? "block" : "hidden"} mb-2 `}>
            <h3>
              Avez-vous besoin d'informations concernant une réalisation, votre
              compte ou autre ? L'onglet 'Contact' vous permettra de m'envoyer
              un message directement à mon adresse e-mail.
            </h3>
          </div>
        </button>
      </div>
    </div>
  );
}
