import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { formatDate } from '@angular/common';

import { Program } from '../classes/program';
import { MythDataService } from '../services/mythdata.service';
import { MessageService } from '../services/message.service';
import { TreeNode } from '../classes/tree-node';
import { RecstatusPipe } from '../pipes/recstatus.pipe';


interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.scss'],
  providers: [ RecstatusPipe]
})
export class ProgramDetailComponent implements OnInit {

  constructor(private dataService: MythDataService, private mesService: MessageService, private recstatus: RecstatusPipe) {
    this.treeData = [];
    this.treeDataSource.data = this.treeData;
  }

  dataLoaded: boolean;

  cardContentClass: string;

  screenshotUrl: string;
  channelIconUrl: string;

  private transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
    };
  }

  treeData: TreeNode[];

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

  treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  @Input() program: Program;

  ngOnInit() {
    this.dataLoaded = false;

    if ((typeof this.program !== 'undefined') && (this.program.showImage)) {
      this.screenshotUrl = this.dataService.getPreviewImageUrlWidth(this.program, 400);
    }

    this.getProgramDetails();
  }

  getProgramDetails(): void {
    if ( typeof this.program !== 'undefined') {
      this.dataService.getProgramDetailsUrl(this.program.Channel.ChanId, this.program.StartTime).subscribe(response => {
        // For recorded programs we don't really want to reload since can either fail or loses file info
        if (response.Program.StartTime !== '') {
          if ((this.program.Recording.FileName !== '') && (response.Program.Recording.FileName === '')) {
            // dont overwrite with new details
          } else {
            this.program = response.Program;
          }
        }

      this.getProgramDetailsCompleted();
     });
   }
  }

  getProgramDetailsCompleted(): void {
    this.dataLoaded = true;

    if (( typeof this.program !== 'undefined' ) && (typeof this.program.Channel !== 'undefined')) {

      const channelNode: TreeNode = { name: 'Channel: ' + this.program.Channel.ChannelName, children: [] };
      channelNode.children.push({ name: 'Name: ' + this.program.Channel.ChannelName, children: []});
      channelNode.children.push({ name: 'Number: ' + this.program.Channel.ChanNum, children: []});
      channelNode.children.push({ name: 'ChanId: ' + this.program.Channel.ChanId, children: []});


      const recordingNode: TreeNode = { name: 'Recording: ' + this.recstatus.transform(this.program.Recording.Status), children: [] };
      this.cardContentClass = 'status-'+this.recstatus.transform(this.program.Recording.Status);
      // recordingNode.children.push({ name: 'Status: ' + this.program.Recording.Status, children: []});
      if ((this.program.Recording.StartTs) && (this.program.Recording.StartTs !== '')) {
        recordingNode.children.push({ name: 'StartTs: ' + formatDate(this.program.Recording.StartTs, 'M/dd/yyyy @ h:mm:ssa', 'en-US'), children: []});
      }
      if ((this.program.Recording.EndTs) && (this.program.Recording.EndTs !== '')) {
        recordingNode.children.push({ name: 'EndTs: ' + formatDate(this.program.Recording.EndTs, 'M/dd/yyyy @ h:mm:ssa', 'en-US'), children: []});
      }
      if ((this.program.Recording.FileName) && (this.program.Recording.FileName !== '')) {
        recordingNode.children.push({ name: 'FileName: ' + this.program.Recording.FileName, children: []});
      }
      if ((this.program.Recording.FileSize) && (this.program.Recording.FileSize !== '0')) {
        recordingNode.children.push({ name: 'FileSize: ' + this.program.Recording.FileSize, children: []});
      }


      const castNode: TreeNode = { name: 'Cast', children: []};
      if (this.program.Cast) {
        for (const ca of this.program.Cast.CastMembers) {
          castNode.children.push({ name: (ca.TranslatedRole !== '' ? ca.TranslatedRole + ': ' : '') + ca.Name, children: []});
        }
      }


      this.treeData = [];
      this.treeData.push(channelNode);
      this.treeData.push(recordingNode);

      if (castNode.children.length > 0) {
        this.treeData.push(castNode);
      }

      this.treeDataSource.data = this.treeData; 

      if ((this.program.Channel.IconURL) && (this.program.Channel.IconURL !== ''))  {
        this.channelIconUrl = "url('"+this.dataService.getChannelIcon(this.program.Channel.IconURL)+"')";
      }
      
    
    }
  }


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
