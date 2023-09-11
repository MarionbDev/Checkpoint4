import { object, string } from "yup";

export const userCreationSchema = object({
  firstname: string("Vous devez renseigner un prénom").required(
    "Un prénom est requis"
  ),
  lastname: string("Vous devez renseigner un nom").required(
    "Un nom est requis"
  ),
  mail: string("Vous devez renseigner un email")
    .email("Un email valide est requis")
    .required("Un email valide est requis"),
  password: string("Vous devez renseigner un mot de passe")
    .matches(
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule et un chiffre."
    )
    .required("Un mot de passe est requis"),
  about: string(),
  pseudo: string(),
});

export const userUpdateSchema = object({
  firstname: string().required(),
  lastname: string().required(),
  mail: string().email().required(),
  about: string(),
  pseudo: string(),
});
