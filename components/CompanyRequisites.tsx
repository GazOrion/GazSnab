import { company } from "@/lib/company";

type Props = {
  id?: string;
};

export function CompanyRequisites({ id = "rekvizity" }: Props) {
  return (
    <section className="static-page-section" id={id}>
      <h2 className="static-page-block__title">Реквизиты</h2>
      <p className="muted static-page-section__lead">
        Юридические и банковские данные для договоров, счетов и безналичной оплаты.
      </p>

      <dl className="requisites requisites-full">
        <div>
          <dt>ИНН</dt>
          <dd>{company.inn}</dd>
        </div>
        <div>
          <dt>КПП</dt>
          <dd>{company.kpp}</dd>
        </div>
        <div>
          <dt>ОГРН</dt>
          <dd>{company.ogrn}</dd>
        </div>
        <div>
          <dt>Расчётный счёт</dt>
          <dd>{company.account}</dd>
        </div>
        <div>
          <dt>Банк</dt>
          <dd>{company.bank}</dd>
        </div>
        <div>
          <dt>БИК</dt>
          <dd>{company.bik}</dd>
        </div>
        <div>
          <dt>Корр. счёт</dt>
          <dd>{company.corrAccount}</dd>
        </div>
        <div>
          <dt>Юридический адрес</dt>
          <dd>{company.address}</dd>
        </div>
        <div>
          <dt>Генеральный директор</dt>
          <dd>{company.director}</dd>
        </div>
      </dl>
    </section>
  );
}
