import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  btnText = 'Compartilhar!';

  constructor(private momentService: MomentService,
    private MessagesService: MessagesService,
    private router: Router ) { }

  ngOnInit(): void {
  }


  async createHandler(moment: Moment){
    // console.log("deu bom");
    console.log(await moment);

    const formData = new FormData();
    formData.append("title", moment.title);
    formData.append("description", moment.description);

    if (moment.image) {
      formData.append("image", moment.image);
    }

    // enviar para o service MomentService
    await this.momentService.createMoment(formData).subscribe();

    // exibir mensagem
    this.MessagesService.add("momento adicionado com sucesso!😁");

    // redirect
    this.router.navigate(['/'])

  }

}
