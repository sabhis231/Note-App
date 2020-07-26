import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResizable]',
})
export class ResizableDirective {
  @Input() resizableGrabWidth = 8;
  @Input() resizableMinWidth = 100;
  @Input() resizableMaxWidth = 800;

  dragging = false;

  constructor(private el: ElementRef) {
    const self = this;

    const EventListenerMode = { capture: true };

    function preventGlobalMouseEvents() {
      document.body.style['pointer-events'] = 'none';
    }

    function restoreGlobalMouseEvents() {
      document.body.style['pointer-events'] = 'auto';
    }

    const newWidth = (wid) => {
      const oldWidth = Math.max(this.resizableMinWidth, wid);
      const newWidth = Math.min(this.resizableMaxWidth, oldWidth);
      el.nativeElement.parentElement.children[0].style.maxWidth =
        newWidth + 'px';
      el.nativeElement.parentElement.children[0].style.minWidth =
        newWidth + 'px';
      const newWidth2ndChild =
        el.nativeElement.parentElement.children[1].offsetWidth +
        el.nativeElement.parentElement.offsetWidth -
        (el.nativeElement.parentElement.children[0].offsetWidth +
          el.nativeElement.parentElement.children[1].offsetWidth) -
        3;

      el.nativeElement.parentElement.children[1].style.minWidth =
        newWidth2ndChild + 'px';
      el.nativeElement.parentElement.children[1].style.maxWidth =
        newWidth2ndChild + 'px';
    };

    const mouseMoveG = (evt) => {
      if (!this.dragging) {
        return;
      }
      newWidth(evt.clientX - el.nativeElement.offsetLeft);
      evt.stopPropagation();
    };

    // const dragMoveG = (evt) => {
    //   if (!this.dragging) {
    //     return;
    //   }
    //   const newWidth =
    //     Math.max(
    //       this.resizableMinWidth,
    //       evt.clientX - el.nativeElement.offsetLeft
    //     ) + 'px';
    //   el.nativeElement.style.width =
    //     evt.clientX - el.nativeElement.offsetLeft + 'px';
    //   evt.stopPropagation();
    // };

    const mouseUpG = (evt) => {
      if (!this.dragging) {
        return;
      }
      restoreGlobalMouseEvents();
      this.dragging = false;
      evt.stopPropagation();
    };

    const mouseDown = (evt) => {
      if (this.inDragRegion(evt)) {
        this.dragging = true;
        preventGlobalMouseEvents();
        evt.stopPropagation();
      }
    };

    const mouseMove = (evt) => {
      if (this.inDragRegion(evt) || this.dragging) {
        el.nativeElement.style.cursor = 'col-resize';
      } else {
        el.nativeElement.style.cursor = 'default';
      }
    };

    document.addEventListener('mousemove', mouseMoveG, true);
    document.addEventListener('mouseup', mouseUpG, true);
    el.nativeElement.addEventListener('mousedown', mouseDown, true);
    el.nativeElement.addEventListener('mousemove', mouseMove, true);
  }

  ngOnInit(): void {
    this.el.nativeElement.style['border-right'] =
      this.resizableGrabWidth + 'px solid darkgrey';
  }

  inDragRegion(evt) {
    return (
      this.el.nativeElement.clientWidth -
        evt.clientX +
        this.el.nativeElement.offsetLeft <
      this.resizableGrabWidth
    );
  }
}
