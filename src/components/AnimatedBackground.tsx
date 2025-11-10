import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Shield, Lock, Cpu } from 'lucide-react';

interface Node {
  x: number;
  y: number;
  id: number;
}

export function AnimatedBackground() {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    // Generate fewer network nodes for better performance
    const generatedNodes: Node[] = [];
    for (let i = 0; i < 6; i++) {
      generatedNodes.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        id: i,
      });
    }
    setNodes(generatedNodes);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020608]">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020608] via-[#0a0e1a] to-[#020608]" />

      {/* Animated gradient orbs - highly optimized */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-8 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #112C3F 0%, transparent 70%)',
          top: '10%',
          left: '15%',
          willChange: 'transform, opacity',
        }}
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-8 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #112C3F 0%, #1a4d5f 50%, transparent 70%)',
          bottom: '10%',
          right: '15%',
          willChange: 'transform, opacity',
        }}
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Simplified grid */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(17,44,63,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(17,44,63,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
        }}
      />

      {/* Single scanning line - lighter */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#112C3F]/40 to-transparent opacity-40"
        style={{ willChange: 'transform' }}
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Network nodes and connections - optimized */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
        {/* Draw connections between nearby nodes */}
        {nodes.map((node, i) => 
          nodes.slice(i + 1).map((otherNode, j) => {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            );
            if (distance < 35) {
              return (
                <motion.line
                  key={`${node.id}-${otherNode.id}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${otherNode.x}%`}
                  y2={`${otherNode.y}%`}
                  stroke="#112C3F"
                  strokeWidth="1"
                  opacity="0"
                  animate={{
                    opacity: [0, 0.25, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              );
            }
            return null;
          })
        )}

        {/* Network nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="3"
              fill="#112C3F"
              animate={{
                r: [2.5, 3.5, 2.5],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: node.id * 0.15,
              }}
            />
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="6"
              fill="none"
              stroke="#112C3F"
              strokeWidth="1"
              opacity="0"
              animate={{
                r: [6, 12],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: node.id * 0.15,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Floating security icons - minimal animation */}
      <motion.div
        className="absolute top-[15%] left-[10%] text-[#112C3F] opacity-4"
        style={{ willChange: 'transform' }}
        animate={{
          y: [0, -3, 0],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Shield className="w-24 h-24" />
      </motion.div>

      <motion.div
        className="absolute top-[60%] right-[8%] text-[#112C3F] opacity-4"
        style={{ willChange: 'transform' }}
        animate={{
          y: [0, 2, 0],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <Lock className="w-20 h-20" />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[70%] text-[#112C3F] opacity-4"
        style={{ willChange: 'transform' }}
        animate={{
          y: [0, -2, 0],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      >
        <Cpu className="w-28 h-28" />
      </motion.div>

      {/* Hexagonal shield pattern - static */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hexagons"
              x="0"
              y="0"
              width="100"
              height="87"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="50,0 100,25 100,75 50,100 0,75 0,25"
                fill="none"
                stroke="#112C3F"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Single radar scan - optimized */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#112C3F]/8"
        style={{ willChange: 'transform, opacity' }}
        animate={{
          scale: [0.92, 1.08],
          opacity: [0.12, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />

      {/* Minimal binary particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#112C3F] opacity-0 text-xs font-mono"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -8],
            opacity: [0, 0.25, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </motion.div>
      ))}
    </div>
  );
}
