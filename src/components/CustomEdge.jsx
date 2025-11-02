import React from 'react';
import { BaseEdge, getBezierPath } from '@xyflow/react';
import '/home/user/pw/personal-web/src/styles/custom_edge.css'

function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }) {
  // стандартная кривая Безье
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      {/* Основная линия */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ ...style }}
        className="custom-edge"
        markerEnd={markerEnd}
      />

      {/* Можно добавить интерактивный слой, например для клика */}
      <path
        d={edgePath}
        fill="none"
        strokeOpacity={0}
        strokeWidth={10}
        className="custom-edge-interaction"
      />
    </>
  );
}

export default CustomEdge;