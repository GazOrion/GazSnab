export const MORE_THAN_EQUIPMENT_ASSETS = {
  dev: "/media/dev.png",
  uc: "/media/uc.png",
  interier: "/media/interier.png",
  ekspl: "/media/ekspl.png"
} as const;

export const MORE_THAN_EQUIPMENT_CARDS = [
  {
    id: "dev",
    image: MORE_THAN_EQUIPMENT_ASSETS.dev,
    title: "Dev-разработка",
    text: "Сайты, CRM-системы, автоматизация процессов и внутренние сервисы для бизнеса.",
    linkLabel: "Подробнее",
    href: "https://dev-ori.ru"
  },
  {
    id: "uc",
    image: MORE_THAN_EQUIPMENT_ASSETS.uc,
    title: "Учебный центр",
    text: "Курсы для детей 7–11 классов: физика, информатика, нейросети и проектные занятия.",
    linkLabel: "Перейти",
    href: "https://uc-orion.ru"
  },
  {
    id: "interier",
    image: MORE_THAN_EQUIPMENT_ASSETS.interier,
    title: "Дизайн интерьеров",
    text: "Планировочные решения, визуализация, подбор материалов и сопровождение проекта.",
    linkLabel: "Смотреть",
    href: "https://dev-ori.ru/dizayn-intererov"
  },
  {
    id: "ekspl",
    image: MORE_THAN_EQUIPMENT_ASSETS.ekspl,
    title: "Эксплуатация газовых сетей",
    text: "Обслуживание, контроль, сопровождение объектов и инженерная поддержка.",
    linkLabel: "Узнать больше",
    href: "https://orion-rostov.ru"
  }
] as const;
