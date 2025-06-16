// import { toastService } from "./toast.service";

const prefix = `STORAGE_${process.env.REACT_APP_ENV}_`

const setValueInLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(prefix + key, JSON.stringify(value))
  } catch (error) {
    // toastService.showToast({title: 'browser doesnt supports adding to storage'});
  }
}

const getValueFromLocalStorage = (key: string): any => {
  try {
    const data = localStorage.getItem(prefix + key)
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    // toastService.showToast({title: 'browser doesnt supports local storage'});
  }
}

const removeValueFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(prefix + key)
  } catch (error) {
    // toastService.showToast({title: 'browser doesnt supports local storage'});
  }
}

const setValueInSessionStorage = (key: string, value: any): void => {
  try {
    sessionStorage.setItem(prefix + key, JSON.stringify(value))
  } catch (error) {
    // toastService.showToast({title: 'browser doesnt supports adding to storage'});
  }
}

const getValueFromSessionStorage = (key: string): any => {
  try {
    const data = sessionStorage.getItem(prefix + key)
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    // toastService.showToast({title: 'browser doesnt supports session storage'});
  }
}

const removeValueFromSessionStorage = (key: string): void => {
  try {
    sessionStorage.removeItem(prefix + key)
  } catch (error) {
    // toastService.showToast({title: 'browser doesnt supports session storage'});
  }
}

export const storageService = {
  setValueInLocalStorage,
  getValueFromLocalStorage,
  removeValueFromLocalStorage,
  setValueInSessionStorage,
  getValueFromSessionStorage,
  removeValueFromSessionStorage,
}
