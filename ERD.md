# Sales Record Management System - Entity Relationship Diagram (ERD)

## Entities & Attributes

### 1. **Customer**
| Attribute          | Type         | Description                     |
|--------------------|--------------|---------------------------------|
| customerNumber     | VARCHAR(50)  | **Primary Key** - Customer ID   |
| firstName          | VARCHAR(100) | First name of customer          |
| lastName           | VARCHAR(100) | Last name of customer           |
| telephone          | VARCHAR(20)  | Phone number                    |
| address            | TEXT         | Physical address                |

---

### 2. **Product**
| Attribute          | Type           | Description                   |
|--------------------|----------------|-------------------------------|
| productCode        | VARCHAR(50)    | **Primary Key** - Product ID  |
| productName        | VARCHAR(255)   | Name of product               |
| quantitySold       | INT            | Total quantity sold           |
| unitPrice          | DECIMAL(10,2)  | Price per unit                |

---

### 3. **Sale**
| Attribute          | Type           | Description                   |
|--------------------|----------------|-------------------------------|
| invoiceNumber      | VARCHAR(50)    | **Primary Key** - Invoice ID  |
| salesDate          | DATE           | Date of sale                  |
| paymentMethod      | VARCHAR(50)    | Payment type (Cash, Card, etc)|
| totalAmountPaid    | DECIMAL(10,2)  | Total amount paid             |
| customerNumber     | VARCHAR(50)    | **Foreign Key** → Customer    |
| productCode        | VARCHAR(50)    | **Foreign Key** → Product     |

---

### 4. **User**
| Attribute          | Type         | Description                     |
|--------------------|--------------|---------------------------------|
| id                 | INT AUTO INC | **Primary Key** - User ID       |
| username           | VARCHAR(50)  | Unique login username           |
| password           | VARCHAR(255) | Hashed password                 |
| created_at         | TIMESTAMP    | Account creation date           |

---

## Relationships & Cardinalities

| Relationship               | Type          | Cardinality |
|---------------------------|---------------|-------------|
| Customer → Sale           | One-to-Many  | 1 Customer → N Sales |
| Product → Sale            | One-to-Many  | 1 Product → N Sales |

---

## ERD Diagram (Visual)

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│    Customer     │         │      Sale       │         │    Product      │
├─────────────────┤         ├─────────────────┤         ├─────────────────┤
│ customerNumber  │◄────────│ invoiceNumber  │────────►│ productCode     │
│ firstName       │  1    N │ salesDate      │  N    1 │ productName     │
│ lastName        │         │ paymentMethod  │         │ quantitySold    │
│ telephone       │         │ totalAmountPaid│         │ unitPrice       │
│ address         │         │ customerNumber │         └─────────────────┘
└─────────────────┘         │ productCode    │
                            └─────────────────┘
```
