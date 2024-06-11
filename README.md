
# Be a Hero - Blood Donation Management System


Be a Hero is a blood donation management system designed to facilitate the process of blood donation, organization management, and hospital coordination. The system offers four main roles: Admin, Donor, Hospital, and Organization, each with specific functionalities tailored to their needs.

## Live Link
[https://fullstack-nextjs-blood-bank.vercel.app](https://fullstack-nextjs-blood-bank.vercel.app/init)


## Sample Credentials:

**Donor Role:**
- Email: moin@gmail.com
- Password: `moin@gmail.com`
**Hospital Role:**
- Email: hospital@gmail.com
- Password: `hospital@gmail.com`
**Organization Role**
- Email: org@gmail.com
- Password: `org@gmail.com`
## Roles and Functionalities:

### Admin:

- Manages all aspects of the blood donation system.
- Responsible for managing donors, hospitals, and organizations.
- Has access to all features and functionalities of the system.

### Donor:

- Registers to donate blood.
- Can view the organizations where they have donated blood.
- Accesses analytics to track their blood donation history.


### Organization:

- Acts as a middleman between donors and hospitals.
- Receives blood donations from donors.
- Supplies blood to registered hospitals.
- Manages inventory, including incoming and outgoing blood units.
- Accesses donor lists and hospital information.
- Utilizes analytics to track blood inventory and distribution.

### Hospital:

- Registers to receive blood from organizations.
- Views available organizations from which to procure blood.
- Utilizes analytics to track blood procurement from different - organizations.
## Installation



```bash
  git clone https://github.com/dev-moinislam/fullstack-nextjs-blood-bank.git
  cd blood-donation
  npm install
```
    
## Development

To run this project on development server  

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`JWT_SECRET`



## Tech Stack

**Client:** ReactJs,NextJs(13.5),TypeScript

**Server:** NextJs,TypeScript

**Database:** MongoDB


## Dependencies
```json
 "dependencies": {
    "@reduxjs/toolkit": "^1.9.5",
    "@types/node": "20.5.9",
    "@types/react": "18.2.21",
    "@types/react-dom": "18.2.7",
    "@types/react-redux": "^7.1.26",
    "apexcharts": "^3.43.0",
    "autoprefixer": "10.4.15",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.3.1",
    "formik": "^2.4.5",
    "jsonwebtoken": "^9.0.2",
    "moment": "^2.29.4",
    "mongoose": "^7.5.0",
    "next": "^13.5.2",
    "postcss": "8.4.29",
    "react": "18.2.0",
    "react-apexcharts": "^1.4.1",
    "react-dom": "18.2.0",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^4.11.0",
    "react-redux": "^8.1.2",
    "react-spinners": "^0.13.8",
    "tailwindcss": "3.3.3",
    "typescript": "5.2.2",
    "yup": "^1.2.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.3",
    "@types/jsonwebtoken": "^9.0.2",
    "daisyui": "^3.8.2"
  }
  ```


## Features:

**Role Based Authentication:** 
- Admin
- Donar
- Hospital
- Organization

**Donor Features:**
- `Organization`: View all organizations where blood donations were made.
- `Analytics`: Track blood donation history through bar charts displaying the quantity and type of blood donated to each organization.


**Organization Features:**
- `Inventory System`: Manage blood inventory, including incoming and - outgoing blood units.
- `Donor List`: Access a list of donors who have donated blood to the - organization.
- `Hospital List`: View registered hospitals and manage blood supply to them.
- `Analytics`: Analyze blood inventory through bar charts showing total in, total out, and available blood units categorized by blood group.

  
**Hospital Features:**
- `Organization`: View available organizations to procure blood from.
- `Analytics`: Track blood procurement from different organizations - through bar charts.

**Logout Fucntionalities:** User can logout whenever they want.

## Contributing

Pull requests are welcome! Feel free to modify or extend BeAHero's functionalities based on your needs.

## Feedback

If you have any feedback, please reach out to me at [moin.coder@gmail.com](mailto:moin.coder@gmail.com)
or ![LinkedIn Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/15px-LinkedIn_logo_initials.png)[Moin Islam](https://www.linkedin.com/in/moin-islam)

