export const company = {
  name: 'ООО "ОРИОН ГАЗСНАБ"',
  inn: "6167203506",
  kpp: "616701001",
  ogrn: "1226100016867",
  account: "40702810852090038751",
  bank: "ЮГО-ЗАПАДНЫЙ БАНК ПАО СБЕРБАНК",
  bik: "046015602",
  corrAccount: "30101810600000000602",
  address:
    "344019, Ростовская область, г.о. город Ростов-на-Дону, г Ростов-на-Дону, ул 14-я Линия, дом 30/48, офис 9, литер Е",
  director: "Сидельникова Виктория Сергеевна",
  phone: "+7 (928) 114-40-28",
  phones: [
    {
      label: "Для заказа продукции",
      number: "+7 (928) 114-40-28"
    },
    {
      label: "Для заказа услуг",
      number: "+7 (928) 136-13-80"
    }
  ],
  email: "gaz-snab22@mail.ru"
};

export function companyPhoneHref(phone: string) {
  return `tel:${phone.replace(/\D/g, "")}`;
}
