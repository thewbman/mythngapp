import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Program } from '../classes/program';
import { MythDataService } from '../mythdata.service';
import { MessageService } from '../message.service';
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
  providers: [ RecstatusPipe ]
})
export class ProgramDetailComponent implements OnInit {

  dataLoaded: boolean;

  imageUrl: string;

  treeData: TreeNode[];

  private transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

  treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  

  @Input() program: Program;

  constructor(private dataService: MythDataService, private mesService: MessageService, private recstatus: RecstatusPipe) { 
    this.treeData = [];
    this.treeDataSource.data = this.treeData;
  }

  ngOnInit() {
    this.dataLoaded = false;

    if (this.program.showImage) {
      this.imageUrl = this.dataService.getPreviewImageUrlWidth(this.program, 400);
    }

    this.getProgramDetails();
  }

  getProgramDetails(): void {
    this.dataService.getProgramDetailsUrl(this.program.Channel.ChanId, this.program.StartTime).subscribe(response => {
      //For recorded programs we don't really want to reload since can either fail or loses file info
      if(response.Program.StartTime !== '') {
        if((this.program.Recording.FileName !== '') && (response.Program.Recording.FileName === "")) {
          //dont overwrite with new details
        } else {
          this.program = response.Program;
        }
      }
      
      this.getProgramDetailsCompleted(); 
   });
  }

  getProgramDetailsCompleted(): void {
    this.dataLoaded = true;

    let channelNode: TreeNode = { name: 'Channel: '+this.program.Channel.ChannelName, children: [] };
    channelNode.children.push({ name: 'Name: '+this.program.Channel.ChannelName, children: []});
    channelNode.children.push({ name: 'Number: '+this.program.Channel.ChanNum, children: []});
    channelNode.children.push({ name: 'ChanId: '+this.program.Channel.ChanId, children: []});
    
    let recordingNode: TreeNode = { name: 'Recording: '+this.recstatus.transform(this.program.Recording.Status), children: [] };
    recordingNode.children.push({ name: 'Status: '+this.program.Recording.Status, children: []});
    recordingNode.children.push({ name: 'StartTs: '+this.program.Recording.StartTs, children: []});
    recordingNode.children.push({ name: 'EndTs: '+this.program.Recording.EndTs, children: []});
    if((this.program.Recording.FileName) && (this.program.Recording.FileName !== "")) {
      recordingNode.children.push({ name: 'FileName: '+this.program.Recording.FileName, children: []});
    }
    if((this.program.Recording.FileSize) && (this.program.Recording.FileSize !== "0")) {
      recordingNode.children.push({ name: 'FileSize: '+this.program.Recording.FileSize, children: []});
    }


    this.treeData = [];
    this.treeData.push(channelNode);
    this.treeData.push(recordingNode);

    this.treeDataSource.data = this.treeData;
  }

  
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
