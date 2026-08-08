import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 1.15,
          durMove: 1.15,
          durReturn: 1.1,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.55,
          durMove: 0.55,
          durReturn: 0.55,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const pointerState = useRef({ x: 0, y: 0, t: 0, boost: 0, active: false });
  const rafRef = useRef(0);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const getDelayMultiplier = () => 1 + pointerState.current.boost;

    const liftCard = (index) => {
      const el = refs[index].current;
      if (!el) return;

      const slotIndex = Math.max(order.current.indexOf(index), 0);
      const baseZIndex = total - slotIndex;

      gsap.killTweensOf(el);
      gsap.set(el, { zIndex: total + 20 });
      gsap.to(el, {
        y: '-=18',
        scale: 1.03,
        duration: 0.12,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.set(el, { zIndex: baseZIndex, scale: 1 });
        }
      });
    };

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });

      tl.timeScale(getDelayMultiplier());
    };

    const scheduleNext = () => {
      clearTimeout(intervalRef.current);
      intervalRef.current = window.setTimeout(() => {
        swap();
        scheduleNext();
      }, Math.max(650, delay / getDelayMultiplier()));
    };

    const updatePointerBoost = (event) => {
      const node = container.current;
      if (!node) return;
      const now = performance.now();
      const rect = node.getBoundingClientRect();
      const nextX = event.clientX - rect.left;
      const nextY = event.clientY - rect.top;

      if (pointerState.current.active) {
        const dt = Math.max(now - pointerState.current.t, 16);
        const dist = Math.hypot(nextX - pointerState.current.x, nextY - pointerState.current.y);
        const pxPerMs = dist / dt;
        const targetBoost = Math.min(1.6, pxPerMs / 0.35);
        pointerState.current.boost += (targetBoost - pointerState.current.boost) * 0.35;
      }

      pointerState.current.x = nextX;
      pointerState.current.y = nextY;
      pointerState.current.t = now;
      pointerState.current.active = true;
    };

    const decayBoost = () => {
      pointerState.current.boost *= 0.92;
      if (Math.abs(pointerState.current.boost) < 0.01) {
        pointerState.current.boost = 0;
      }
      rafRef.current = window.requestAnimationFrame(decayBoost);
    };

    const onPointerEnter = () => {
      pointerState.current.active = true;
    };

    const onPointerLeave = () => {
      pointerState.current.active = false;
    };

    const onPause = () => {
      tlRef.current?.pause();
      clearTimeout(intervalRef.current);
    };

    const onResume = () => {
      tlRef.current?.play();
      scheduleNext();
    };

    swap();
    scheduleNext();
    rafRef.current = window.requestAnimationFrame(decayBoost);

    const node = container.current;
    node?.addEventListener('pointermove', updatePointerBoost);
    node?.addEventListener('pointerenter', onPointerEnter);
    node?.addEventListener('pointerleave', onPointerLeave);

    if (pauseOnHover) {
      node?.addEventListener('mouseenter', onPause);
      node?.addEventListener('mouseleave', onResume);
      return () => {
        node?.removeEventListener('pointermove', updatePointerBoost);
        node?.removeEventListener('pointerenter', onPointerEnter);
        node?.removeEventListener('pointerleave', onPointerLeave);
        node?.removeEventListener('mouseenter', onPause);
        node?.removeEventListener('mouseleave', onResume);
        clearTimeout(intervalRef.current);
        cancelAnimationFrame(rafRef.current);
      };
    }

    return () => {
      node?.removeEventListener('pointermove', updatePointerBoost);
      node?.removeEventListener('pointerenter', onPointerEnter);
      node?.removeEventListener('pointerleave', onPointerLeave);
      clearTimeout(intervalRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, refs, config]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onMouseEnter: (e) => {
            child.props.onMouseEnter?.(e);
            liftCard(i);
          },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;