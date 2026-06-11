import { redirect } from "next/navigation";

/** Реквизиты перенесены на страницу «О компании». */
export default function RequisitesPage() {
  redirect("/o-kompanii#rekvizity");
}
