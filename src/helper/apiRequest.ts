import { IFormValues, ILoginReq } from "@/types/types";

// const baseUrl='http://localhost:3000/api/'


export function loginUser(loginInfo:ILoginReq) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify(loginInfo),
          headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }

  export function RegisterUser(RegisterInfo:IFormValues) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/user/register', {
          method: 'POST',
          body: JSON.stringify(RegisterInfo),
          headers: { 'content-type': 'application/json' }
        });
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }

  export function getCurrentUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/user/self');
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }

  export function signOut() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/user/logout');
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }