import { object, string } from "yup";

export const userCreationSchema = object({
  firstname: string("Vous devez renseigner un prénom").required(
    "Un prénom est requis"
  ),
  lastname: string("Vous devez renseigner un nom").required(
    "Un nom est requis"
  ),
  mail: string("Vous devez renseigner un email")
    .email()
    .required("Un email est requis"),
  password: string("Vous devez renseigner un mot de passe").required(
    "Un mot de passe est requis"
  ),
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
