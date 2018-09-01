import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { InviteService } from '../invite.service';

function dynamicLoaded(value) {
  window["dynamicLoaded"](value)
}

export class Guest {
  constructor(
    public code: String,
    public name: String,
    public going: Boolean = null
  ) { }
}

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  family: any = {}
  guestsGoing: any[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private inviteService: InviteService
  ) { }

  async ngOnInit() {

    this.activatedRoute.url.subscribe(url => {
      if (url.length === 0) {
        window.location.href = "http://sites.icasei.com.br/lueni"
      }
    })

    this.activatedRoute.params.subscribe(async params => {
      dynamicLoaded(false)

      let familyCode = params['code']

      let familyDataPromise = this.inviteService.loadFamily(familyCode)
      let whoIsGoingDataPromise = this.inviteService.whoIsGoing()

      let familyData: any = await familyDataPromise
      let whoIsGoingData: any = await whoIsGoingDataPromise

      if (familyData.family != null) {
        this.family = familyData.family
        this.guestsGoing = whoIsGoingData.groups
      } else {
        this.router.navigate(['404'])
      }

      dynamicLoaded(true)
    })
  }

  async toggleMemberGoing(familyCode: String, member: any) {
    member.going = member.going === true ? null : true
    await this.inviteService.setMemberGoing(familyCode, member.code, member.going)
    this.guestsGoing = (await this.inviteService.whoIsGoing()).groups
  }

  async toggleMemberNotGoing(familyCode: String, member: any) {
    member.going = member.going === false ? null : false
    await this.inviteService.setMemberGoing(familyCode, member.code, member.going)
    this.guestsGoing = (await this.inviteService.whoIsGoing()).groups
  }

}
