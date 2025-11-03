import React from "react";
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, BackgroundVariant, Controls, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from "./CustomeNode";
import CustomEdge from "./CustomEdge";
 
const initialNodes = [
  { id: 'top', position: { x: 160, y: -160 }, data: { title: 'study', content: `now i'm studying\ncomputer science\nin Russia.` }, type:'custom' },
  { id: 'center', position: { x: 350, y: -20 }, data: { title: 'now know', content: `ansible, docker\nk8s, terraform,\npostgres, aws` }, type:'custom' },
  { id: 'right', position: { x: 600, y: -100 }, data: { title: 'love', content: `linux, devops,\nspend money` }, type:'custom' },
  { id: 'left', position: { x: 100, y: 70 }, data: {  title: 'contact', content: `my tg: @rerokai\ngithub: rerokai` }, type:'custom' },
];

const initialEdges = [
  { id: "e1", source: "top", target: "center", targetHandle:"t" },
  { id: "e2", source: "left", target: "center", targetHandle:"l" },
  { id: "e3", source: "right", target: "center", targetHandle:"r" },
];


const Skills = function() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges); 
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge({...params, type:"custom"}, edgesSnapshot)),
    [],
  );
 
  return (
    <div style={{ width: '100vw', height: '75vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{custom: CustomNode}}
        edgeTypes={{custom: CustomEdge}}
        panOnScroll = {false}
        panOnDrag = {false}
        zoomOnScroll = {false}
        zoomOnPinch= {false}
        zoomOnDoubleClick={false}
        attributionPosition={"bottom-left"}
        fitView

        >

          <Background 
            id="main.bg"
            variant={BackgroundVariant.Dots}
            gap={18}
            size={0.9}
            color="#6B7D65"
            bgColor="#D4D9D0"
          />
          

        </ReactFlow>
    </div>
  );
}

export default Skills;