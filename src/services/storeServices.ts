import http from "../httpCommon";
import IStoreData from "../interface/IStoreData";

class StoreDataService {
  getAll() {
    return http.get<Array<IStoreData>>("/store");
  }

  get(id: string) {
    return http.get<IStoreData>(`/store/${id}`);
  }

  create(data: IStoreData) {
    return http.post<IStoreData>("/store", data);
  }

  update(data: IStoreData, id: any) {
    return http.put<any>(`/store/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/store/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/store`);
  }

  findByTitle(title: string) {
    return http.get<Array<IStoreData>>(`/store?title=${title}`);
  }
}

export default new StoreDataService();
