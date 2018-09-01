import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = "https://ws.lucasenicole.com.br"

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private http: HttpClient) { }

  async loadFamily(familyCode: String): Promise<any> {
    return await this.http.get(`${BASE_URL}/families/${familyCode}`).toPromise()
  }

  async setMemberGoing(familyCode: String, memberCode: String, going: Boolean): Promise<any> {
    await this.http.post(`${BASE_URL}/families/${familyCode}/members/${memberCode}/going`, going).toPromise()
  }

  async whoIsGoing(): Promise<any> {
    return await this.http.get(`${BASE_URL}/guests/who-is-going`).toPromise()
  }
}
