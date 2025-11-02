import React from 'react';
import { Handle, Position } from '@xyflow/react';
import '/home/user/pw/personal-web/src/styles/custom_nodes.css';

function CustomNode({ id, data }) {
  return (
    <div className="custom-node">
      {/* Универсальный контент узла */}
      <div className="custom-node__content">
        <div className="custom-node__header">
          {data.title || 'Node'}
        </div>
        <div className="custom-node__divider"></div>
        
        <div className="custom-node__body">
          {data.content && data.content.split('\n').map((line, index) => (
            <div key={index} className="custom-node__line">
              {line}
            </div>
          ))}
        </div>
      </div>
         


      {id ==="center" && (
        <>
          <Handle type="target" position={Position.Top} id="t"/>
          <Handle type="target" position={Position.Left} id="l"/>
          <Handle type="target" position={Position.Right} id="r"/>
        </>
      )}

      
      {id === "top" && <Handle type ="source" position={Position.Bottom} id="out" />}
      {id === "left" && <Handle type ="source" position={Position.Right} id="out" />}
      {id === "right" && <Handle type ="source" position={Position.Left} id="out" />}
    </div>
  );
}
export default CustomNode;