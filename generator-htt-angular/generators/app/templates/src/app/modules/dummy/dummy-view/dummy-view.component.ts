import {Component, OnInit} from '@angular/core';
import {<%=entity.name%>} from "../../../models/<%=fileName%>";

@Component({
  selector: 'app-<%=fileName%>-view',
  templateUrl: './<%=fileName%>-view.component.html',
  styleUrls: ['./<%=fileName%>-view.component.scss']
})
export class <%=entity.name%>ViewComponent implements OnInit {

  data: <%=entity.name%>;

  constructor() { }

  ngOnInit(): void {
  }

}
