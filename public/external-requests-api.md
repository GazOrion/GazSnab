# API заявок с внешних сайтов (OrionCRM)

Документ описывает публичный endpoint для приёма заявок с сайтов **Devori**, **УЦ Орион**, **ГазСнаб**, **УК Орион**, **Дизайн** в CRM Orion (вкладка «Заявки»).

## Endpoint

```
POST https://ВАШ_ДОМЕН/api/public/requests
```

Поддерживается CORS preflight: `OPTIONS /api/public/requests`.

## Аутентификация

Передайте секретный API-ключ одним из способов:

| Способ | Пример |
|--------|--------|
| Заголовок `x-api-key` | `x-api-key: ork_xxxxxxxx` |
| Bearer-токен | `Authorization: Bearer ork_xxxxxxxx` |

Ключи создаются в CRM: **Заявки → Настройки → API-ключи**.  
У каждого ключа задаётся список разрешённых сайтов (`allowed_targets`).  
Если разрешён только один сайт — поле `target_site` в теле можно не передавать.

Устаревший вариант (env): `EXTERNAL_REQUEST_API_KEYS=key1:Метка,key2:Метка2`.

## Заголовки запроса

```
Content-Type: application/json
x-api-key: YOUR_SECRET_KEY
```

## Общие поля (обязательные для всех сайтов)

| Поле | Тип | Обязательно | Описание |
|------|-----|-------------|----------|
| `target_site` | string | да* | Источник заявки (см. таблицу ниже) |
| `full_name` | string | да | Имя клиента (алиасы: `fullName`, `name`) |
| `phone` | string | да | Мобильный телефон в любом удобном формате |
| `preferred_contact_method` | string | да | Удобный способ связи (алиасы: `preferredContactMethod`, `contact_method`) |

\* Не обязательно, если API-ключ привязан к одному сайту.

### Значения `target_site`

| Код | Сайт |
|-----|------|
| `DEVORI` | Devori |
| `UC_ORION` | УЦ Орион |
| `GAZSNAB` | ГазСнаб |
| `UK_ORION` | УК Орион |
| `DESIGN` | Дизайн |

### Значения `preferred_contact_method`

| Код | Способ связи |
|-----|--------------|
| `PHONE` | Телефон |
| `MAX` | MAX |
| `TELEGRAM` | Telegram |
| `WHATSAPP` | WhatsApp |

Допускаются русские синонимы: «Телефон», «Макс», «Телеграм», «Ватсап».

## Общие поля (необязательные)

| Поле | Тип | Описание |
|------|-----|----------|
| `source` | string | Человекочитаемая метка формы (например, «Главная — попап») |
| `email` | string | E-mail |
| `message` | string | Свободный комментарий (алиас: `comment`) |
| `website` | string | Домен или название сайта |
| `meta` | object | Произвольные доп. поля (сохраняются как есть) |

---

## Поля по сайтам

### Devori (`DEVORI`)

Достаточно общих полей.

```json
{
  "target_site": "DEVORI",
  "full_name": "Анна Смирнова",
  "phone": "+7 900 111-22-33",
  "preferred_contact_method": "TELEGRAM",
  "source": "Форма обратной связи"
}
```

### УЦ Орион (`UC_ORION`)

| Поле | Тип | Описание |
|------|-----|----------|
| `subject` | string | Предмет обучения, свободный текст (алиасы: `subject_text`, `subjectText`) |

```json
{
  "target_site": "UC_ORION",
  "full_name": "Пётр Иванов",
  "phone": "+7 900 222-33-44",
  "preferred_contact_method": "PHONE",
  "subject": "Подготовка к ЕГЭ по физике"
}
```

### ГазСнаб (`GAZSNAB`)

| Поле | Тип | Описание |
|------|-----|----------|
| `cart` | object | Корзина товаров |
| `cart.total` | number | Сумма корзины (алиасы: `cart_total`, `cartTotal`, `sum`) |
| `cart.items` | array | Список позиций (алиасы: `products`, `cart_items`) |

Каждая позиция в `cart.items`:

| Поле | Тип | Обязательно | Описание |
|------|-----|-------------|----------|
| `name` | string | да | Название товара (алиасы: `product`, `title`) |
| `quantity` | number | нет | Количество (по умолчанию `1`; алиасы: `qty`, `count`) |
| `price` | number | нет | Сумма/цена позиции (алиасы: `amount`, `sum`, `line_total`) |
| `article` | string | нет | Артикул (алиасы: `sku`, `vendor_code`, `vendorCode`) |
| `url` | string | нет | Ссылка на карточку товара (алиасы: `product_url`, `productUrl`, `link`) |

```json
{
  "target_site": "GAZSNAB",
  "full_name": "ООО СтройГаз",
  "phone": "+7 900 333-44-55",
  "preferred_contact_method": "WHATSAPP",
  "cart": {
    "total": 45780,
    "items": [
      {
        "name": "Счётчик газа G4",
        "quantity": 2,
        "price": 12800,
        "article": "SG-G4-001",
        "url": "https://gazsnab.example/catalog/sg-g4-001"
      },
      {
        "name": "Регулятор давления",
        "quantity": 1,
        "price": 20180,
        "article": "RD-220",
        "url": "https://gazsnab.example/catalog/rd-220"
      }
    ]
  }
}
```

Если передан `cart`, но ни одна позиция не прошла валидацию — ответ `400`.

### УК Орион (`UK_ORION`)

| Поле | Тип | Описание |
|------|-----|----------|
| `page_url` | string | URL страницы, с которой отправлена заявка (алиасы: `pageUrl`, `referrer_url`, `referrerUrl`) |

```json
{
  "target_site": "UK_ORION",
  "full_name": "Мария Козлова",
  "phone": "+7 900 444-55-66",
  "preferred_contact_method": "MAX",
  "page_url": "https://uk-orion.example/services/gas-connection?utm_source=landing",
  "message": "Нужна консультация по подключению"
}
```

### Дизайн (`DESIGN`)

Достаточно общих полей.

```json
{
  "target_site": "DESIGN",
  "full_name": "Игорь Волков",
  "phone": "+7 900 555-66-77",
  "preferred_contact_method": "TELEGRAM",
  "source": "Портфолио — заказ проекта"
}
```

---

## Вложенный объект `payload` (опционально)

Сайт-специфичные поля можно передавать во вложенном объекте:

```json
{
  "target_site": "UC_ORION",
  "full_name": "Иван",
  "phone": "+79001234567",
  "preferred_contact_method": "PHONE",
  "payload": {
    "subject": "Информатика"
  }
}
```

---

## Успешный ответ

**HTTP 201**

```json
{
  "success": true,
  "id": "uuid-заявки",
  "created_at": "2026-06-23T12:00:00.000Z",
  "target_site": "UK_ORION",
  "preferred_contact_method": "MAX"
}
```

## Ошибки

| HTTP | Причина |
|------|---------|
| 401 | Нет или неверный API-ключ |
| 403 | Ключ неактивен или сайт не разрешён для ключа |
| 400 | Невалидное тело запроса |
| 500 | Внутренняя ошибка сервера |

Пример ошибки валидации:

```json
{
  "error": "Field \"preferred_contact_method\" is required",
  "field": "preferred_contact_method",
  "allowed_values": ["PHONE", "WHATSAPP", "TELEGRAM", "MAX"]
}
```

---

## Примеры интеграции

### JavaScript (fetch)

```javascript
await fetch('https://ВАШ_ДОМЕН/api/public/requests', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ORION_CRM_API_KEY,
  },
  body: JSON.stringify({
    target_site: 'GAZSNAB',
    full_name: form.name,
    phone: form.phone,
    preferred_contact_method: 'WHATSAPP',
    cart: {
      total: cart.total,
      items: cart.items.map((item) => ({
        name: item.title,
        quantity: item.qty,
        price: item.lineTotal,
        article: item.sku,
        url: item.href,
      })),
    },
  }),
})
```

### cURL

```bash
curl -X POST "https://ВАШ_ДОМЕН/api/public/requests" \
  -H "Content-Type: application/json" \
  -H "x-api-key: ork_xxxxxxxx" \
  -d '{
    "target_site": "UK_ORION",
    "full_name": "Тест",
    "phone": "+79001234567",
    "preferred_contact_method": "PHONE",
    "page_url": "https://example.com/page"
  }'
```

---

## Переменные окружения (сервер CRM)

```env
# Устаревшие ключи (через запятую, опционально метка после двоеточия)
EXTERNAL_REQUEST_API_KEYS=secret1:УЦ,secret2:УК

# CORS: список origin через запятую, или * (по умолчанию *)
EXTERNAL_REQUEST_CORS_ORIGINS=https://devori.example,https://uc-orion.example
```

---

## Поведение в CRM

- Заявка попадает во вкладку **Заявки** с меткой источника (`target_site`).
- Менеджеры с подпиской на источник получают push и уведомление в CRM.
- Для **ГазСнаб** корзина отображается в карточке заявки.
- Для **УЦ Орион** поле `subject` сохраняется и показывается как предмет.
- Для **УК Орион** `page_url` — кликабельная ссылка на страницу отправки.
