import { useEffect, useRef } from 'react';
import Link from 'next/link';
import p5 from 'p5';

export default function FirstPost() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let location, velocity, gravity, size, location2, velocity2, gravity2, size2;

      p.setup = () => {
        const canvas = p.createCanvas(640, 360);
        canvas.parent(canvasRef.current);
        location = new p.createVector(100, 100);
        velocity = new p.createVector(1.5, 2.1);
        gravity = new p.createVector(0, 0.2);
        size = 48;
        location2 = new p.createVector(200, 200);
        velocity2 = new p.createVector(-1, 1.5);
        gravity2 = new p.createVector(0, 0.3);
        size2 = 64;
      };

      p.draw = () => {
        // Draw on the canvas and update variables
        p.background(0);

        location.add(velocity);
        velocity.add(gravity);

        if ((location.x > p.width) || (location.x < 0)) {
          velocity.x = velocity.x * -1;
        }

        if (location.y > p.height) {
          velocity.y = velocity.y * -0.98;
          location.y = p.height;
        }

        p.stroke(255);
        p.strokeWeight(2);
        p.fill(127);
        p.ellipse(location.x, location.y, size, size);

        location2.add(velocity2);
        velocity2.add(gravity2);

        if ((location2.x > p.width - size2 / 2) || (location2.x < size2 / 2)) {
          velocity2.x = velocity2.x * -1;
        }

        if (location2.y > p.height - size2 / 2) {
          velocity2.y = velocity2.y * -0.85;
          location2.y = p.height - size2 / 2;
        }

        p.stroke(255);
        p.strokeWeight(2);
        p.fill(255, 255, 0);
        p.ellipse(location2.x, location2.y, size2, size2);
      };
    };

    // Create the Processing instance with the sketch
    const processingInstance = new p5(sketch);

    // Clean up by removing the Processing instance when the component unmounts
    return () => {
      processingInstance.remove();
    };
  }, []);

  return (
    <>
      <h1>이름: 조준상</h1>
      <h1>학번: 2018007792</h1>
      <h1>이번 과제는 너무 어려웠습니다...ㅠㅠ</h1>
      <div ref={canvasRef} /> {/* Add the canvas element */}
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}