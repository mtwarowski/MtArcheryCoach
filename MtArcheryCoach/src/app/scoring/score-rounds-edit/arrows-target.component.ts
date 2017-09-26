import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { IPoint } from '../scores/scores.component';
import { ITargetField, ITarget } from '../scoring.module';

const arrowPointRadius: number = 0.5;
const viewBoxSize: number = 100;

@Component({
    selector: 'arrows-target-component',
    template: `
    <div class="container-fluid">
        <!--TODO THIS MIGHT BE DELETED IF WE DON'T HAVE ANY ZOOM IN FEATURE 
        <div class="row">
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-default" (click)="zoomTargetBy(-100)"><span class="glyphicon glyphicon-zoom-out"></span></button>
                <button type="button" class="btn btn-default" (click)="zoomTargetBy(100)"><span class="glyphicon glyphicon-zoom-in"></span></button>
            </div>
        </div>-->
        <div class="row">
            <div class="targetContainer">
                <div #targetPresenter class="targetPresenter">
                    <svg #svg *ngIf="targetFields" [style.height]="zoom + '%'" [style.width]="zoom + '%'" [attr.viewBox]="viewBoxText">
                        <circle *ngFor="let targetElement of targetFields" [attr.cx]="targetElement.cx" [attr.cy]="targetElement.cy" [attr.r]="targetElement.r" [attr.stroke]="targetElement.stroke" [attr.stroke-width]="targetElement.strokeWidth" [attr.fill]="targetElement.fill"/>
                        <!--<circle *ngFor="let arrowPointElement of arrowPointElements" [attr.cx]="arrowPointElement.cx" [attr.cy]="arrowPointElement.cy"[attr.r]="arrowPointElement.r" [attr.stroke]="arrowPointElement.stroke" [attr.stroke-width]="arrowPointElement.strokeWidth" [attr.fill]="arrowPointElement.fill"/>-->
                        <!--<circle *ngFor="let arrowPoint of arrowPoints" [attr.cx]="arrowPoint.targetView.cx" [attr.cy]="arrowPoint.targetView.cy" [attr.r]="arrowPoint.targetView.r" [attr.stroke]="arrowPoint.targetView.stroke" [attr.stroke-width]="arrowPoint.targetView.strokeWidth" [attr.fill]="arrowPoint.targetView.fill"/>-->
                        <circle class="targetCursor" [attr.cx]="targetCursorCircle.cx" [attr.cy]="targetCursorCircle.cy" [attr.r]="targetCursorCircle.r" [attr.stroke]="targetCursorCircle.stroke" [attr.stroke-width]="targetCursorCircle.strokeWidth" [attr.fill]="targetCursorCircle.fill"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>`,
    styles: [
        `
.targetContainer{
   position: relative;
   width: 100%;
   padding-top: 100%;
}

.targetPresenter{
   position:  absolute;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   overflow: hidden;
}

.hoverPointValue{
   position:  absolute;
   top: 0;
   overflow: hidden;
}
`]
})
export class ArrowsTargetComponent implements AfterViewInit  {

     public targetFields: ITargetField[] = [];
     public viewBoxText: string = "0 0 100 100";
     @ViewChild('svg') svgTargetContainer: ElementRef;
     @ViewChild('targetPresenter') targetPresenter: ElementRef;

     public svgTarget: any;
     public targetCursorCircle: any;
     public zoom: number = 100;
  
//TODO THIS MIGHT BE DELETED  
//     private _pointSetDefinition: PointSetDefinition;
//     get pointSetDefinition(): PointSetDefinition {
//         return this._pointSetDefinition;
//     }

//TODO THIS MIGHT BE DELETED
//     private zeroPointDef: PointDefinition;

    private _target: ITarget;
    private zeroTargetField: ITargetField;

    @Input('target')
    set target(value: ITarget) {
        this._target = value;
        
        var nonZeroTargetFields = this._target.targetFields.filter(v => v.fill != null && v.fill != undefined);

        this.zeroTargetField = this._target.targetFields.filter(v => v.point === 0)[0];
        this.targetFields = nonZeroTargetFields.sort((a, b) => a.r > b.r ? -1 : 1);

        this.viewBoxText = this.generateViewBox(this.targetFields);
    }
    
//     public _arrowPoints: IPoint[];
//     @Input() 
//     get arrowPoints() {
//         return this._arrowPoints.filter(value => <any>(value)  && <any>(value.targetView));
//     }
//     set arrowPoints(newArrowPoints: IPoint[]) {
//         this._arrowPoints = newArrowPoints;
//     }

     @Output("arrowPointSelected") public arrowPointSelected: EventEmitter<IPoint> = new EventEmitter();
    
    @HostListener('mouseup')
    @HostListener('touchend')
    onMouseup() {
        if (this.mouseInTargetZone()) {
            var newArrowPoint = this.getArrowPoint(this.targetCursorCircle);
            this.arrowPointSelected.emit(newArrowPoint);
        }

//         this.zoomOut();
     }

//     private _pageY: number;
//     private _pageX: number;
//     public onUserInputPositionChange(e: UserInputPosition) {
//         this._pageY = e.clientY;
//         this._pageX = e.clientX;

//         if (true) {
//             //scroll while drag
//             const y = this._pageY;
//             const x = this._pageX;

//             var presenter = this.targetPresenter.nativeElement;
//             var container = presenter.parentElement;
//             const containerBottom = container.offsetTop + presenter.offsetHeight;
//             const containerTop = container.offsetTop;
//             const containerHeight = containerBottom - containerTop;
//             const tenPercentOfHeight = containerHeight * 0.1;
//             if (containerBottom - tenPercentOfHeight < y) {
//                 this._scrollDown(presenter, y);
//             } else if (containerTop + tenPercentOfHeight >= y) {
//                 this._scrollUp(presenter, y);
//             }
            
//             const containerRight = container.offsetLeft + container.offsetWidth;
//             const containerLeft = presenter.offsetLeft;
//             const containerWidth = containerLeft - containerRight;
//             const tenPercentOfWidth = containerWidth * 0.1;

//             if (containerRight - tenPercentOfHeight < y) {
//                 this._scrollRight(presenter, x);
//             } else if (containerLeft + tenPercentOfHeight >= y) {
//                 this._scrollLeft(presenter, x);
//             }
//         }
//     }

//     _scrollDown(container, pageY) {
//         //todo check is dragging
//         if (pageY === this._pageY) {
//             container.scrollTop += 5;
//             setTimeout(this._scrollDown.bind(this, container, pageY), 5);
//         }
//     }

//     _scrollUp(container, pageY) {
//         //todo check is dragging
//         if (pageY === this._pageY) {
//             container.scrollTop -= 5;
//             setTimeout(this._scrollUp.bind(this, container, pageY), 5);
//         }
//     }

//     _scrollLeft(container, pageX) {
//         //todo check is dragging
//         if (pageX === this._pageX) {
//             container.scrollLeft -= 5;
//             setTimeout(this._scrollLeft.bind(this, container, pageX), 5);
//         }
//     }

//     _scrollRight(container, pageX) {
//         //todo check is dragging
//         if (pageX === this._pageX) {
//             container.scrollLeft += 5;
//             setTimeout(this._scrollRight.bind(this, container, pageX), 5);
//         }
//     }

    
//     @HostListener('mousedown')
//     @HostListener('touchstart')
//     onMouseDown() {
//         //zoom in
//         //set flag of zoomed in
//         //allow to scroll when moving is
//         this.zoomIn();
//     }

//     @HostListener('touchmove', ['$event'])
//     onTouchmove(event: TouchEvent) {
//         this.onMousemove(event.targetTouches[0]);
//     }

    
    @HostListener('mousemove', ['$event'])
    onMousemove(event: UserInputPosition) {

        if (!this.targetCursorCircle)
            return;

        var cursorPosition = this.getCursorPosition(event);
        this.targetCursorCircle.cx = cursorPosition.x;
        this.targetCursorCircle.cy = cursorPosition.y;

        // this.currentHoverPointValue = "";
        // if (this.mouseInTargetZone()) {
        //     this.onUserInputPositionChange(event);
        //     var pointDefId = this.getArrowSvgCircleElement(this.targetCursorCircle).pointDefId;

        //     for (var i = 0; i < this.pointSetDefinition.availablePoints.length; i++) {

        //         if (pointDefId === this.pointSetDefinition.availablePoints[i].id)
        //             this.currentHoverPointValue = this.pointSetDefinition.availablePoints[i].displayValue +
        //                 " of value: " +
        //                 this.pointSetDefinition.availablePoints[i].value;
        //     }
        // }
    }

//     private zoomIn() {
//         this.zoom = this.zoom * 3;
//     }

//     private zoomOut() {
//         this.zoom = 100;
//     }

    private getCursorPosition(event: UserInputPosition) : SvgPointElement {
        this.targetCursorCircle.x = event.clientX; this.targetCursorCircle.y = event.clientY;
        return this.targetCursorCircle.matrixTransform(this.svgTarget.getScreenCTM().inverse());
    }

//     public currentHoverPointValue: string;
//     constructor() {
//         this.targetCursorCircle = { cx: 0, cy: 0 };
//         this.currentHoverPointValue = '--';
//     }

    ngAfterViewInit(): void {
        this.svgTarget = this.svgTargetContainer.nativeElement;
        this.targetCursorCircle = this.svgTarget.createSVGPoint();
        this.targetCursorCircle.r = arrowPointRadius;
        this.targetCursorCircle.strokeWidth = 0.02;
        this.targetCursorCircle.stroke = "grey";
        this.targetCursorCircle.fill = "yellow";
        this.targetCursorCircle.cx = 0;
        this.targetCursorCircle.cy = 0;
        this.targetCursorCircle.pointDefId = 0;

        //this.targetPresenter.nativeElement.onmousemove = this.onUserInputPositionChange;
    }

//     public zoomTargetBy(zoomValue: number) {
//         this.zoom = this.zoom + zoomValue;
//     }

//     //private generateTarget(pointDefinitions: PointDefinition[]): void {
//     //    this.targetElements = [];

//     //    var maxRValue = 0.99;
//     //    var baseStrokeWidth = 0.002;
//     //    for (var i = pointDefinitions.length - 1; i >= 0; i--) {
//     //        var fieldSize = (maxRValue / pointDefinitions.length) * (i + 1) / 2;
//     //        this.targetElements.push(this.generateTargetRing(pointDefinitions[i].targetView, fieldSize - baseStrokeWidth, baseStrokeWidth, pointDefinitions[i].id));
//     //    }
//     //}

//     //private generateTargetRing(targetView: ITargetView, rPercentage: number, strokeWidth: number, pointDefId: number): SvgCircleElement {
//     //    return {
//     //        r: rPercentage * 100,
//     //        strokeWidth: strokeWidth * 100,
//     //        stroke: targetView.stroke,
//     //        fill: targetView.fill,
//     //        cx: 50,
//     //        cy: 50,
//     //        pointDefId: pointDefId
//     //    }
//     //};

    private generateViewBox(allTargetFields: ITargetField[]): string {
        var biggestElement = allTargetFields[0];

        //skip first one because im getting it.
        for (var i = 1; i < allTargetFields.length; i++) {
            var currentElement = allTargetFields[i];
            if (biggestElement.r < currentElement.r) {
                biggestElement = currentElement;
            }
        }


        var targetFieldsWidth = (biggestElement.r + (biggestElement.strokeWidth / 2)) * 2 * 1.1;
        var startXPosition =biggestElement.cx - (targetFieldsWidth / 2);
        var StartYPosition =biggestElement.cy - (targetFieldsWidth / 2);

        return "" + startXPosition + " " + StartYPosition + " " + targetFieldsWidth + " " + targetFieldsWidth;
    }


//TODO THIS MIGHT BE DELETED
    // private generateTargetFromDefs(pointDefinitions: PointDefinition[]): void {
    //     this.targetElements = [];

    //     var maxRValue = 0.99;
    //     var baseStrokeWidth = 0.002;
    //     for (var i = pointDefinitions.length - 1; i >= 0; i--) {
    //         var fieldSize = (maxRValue / pointDefinitions.length) * (i + 1) / 2;
    //         this.targetElements.push(this.generateTargetRing(pointDefinitions[i].targetView, pointDefinitions[i].id));
    //     }
    // }

//TODO THIS MIGHT BE DELETED
//     private generateTargetRing(targetView: ITargetView, pointDefId: number): SvgCircleElement {
//         return {
//             r: targetView.r,
//             strokeWidth: targetView.strokeWidth,
//             stroke: targetView.stroke,
//             fill: targetView.fill,
//             cx: targetView.cx,
//             cy: targetView.cy,
//             pointDefId: pointDefId
//         }
//     };

    private mouseInTargetZone() : boolean {
        return 0 <= this.targetCursorCircle.cx && this.targetCursorCircle.cx <= viewBoxSize
            && 0 <= this.targetCursorCircle.cy && this.targetCursorCircle.cy <= viewBoxSize;
    }

    private getArrowPoint(targetCursorCircle: SvgCirclePointElement): IPoint {
        var selectedTargetFieldElement = this.getSelectedTargetFieldElement(targetCursorCircle);

        return { cx: targetCursorCircle.cx, cy: targetCursorCircle.cy, fill: targetCursorCircle.fill, stroke: targetCursorCircle.stroke, r: targetCursorCircle.r, strokeWidth: targetCursorCircle.strokeWidth, 
          value: selectedTargetFieldElement.point, displayValue: selectedTargetFieldElement.displayPoint
        };
        // var pointDef = getPointDefById(this.pointSetDefinition.availablePoints, arrowSvgCircleElement.pointDefId);
        // return { id: 0, scoreRoundId: 0, value: pointDef.value, displayValue: pointDef.displayValue, pointDefinitionId: pointDef.id, targetView: arrowSvgCircleElement };
    }

    private getSelectedTargetFieldElement(targetCursorCircle: SvgCirclePointElement): ITargetField {

        if (0 > targetCursorCircle.cx || targetCursorCircle.cx - targetCursorCircle.r > 100 ||
            0 > targetCursorCircle.cy || targetCursorCircle.cy - targetCursorCircle.r > 100){
            //console.error("Invalid pointer coordinates: x=" + targetCursorCircle.cx + " y=" + targetCursorCircle.cy);
            return null;
        }

        let selectedTargetField = this.zeroTargetField;
        for (var i = this.targetFields.length - 1; i >= 0; i--) {
            var targetElement = this.targetFields[i];

            if (this.isPointingTargetElement(targetElement, targetCursorCircle)) {
                selectedTargetField = targetElement;
                break;
            }
        }

        return selectedTargetField;
        // let newTargetCircle = Object.assign({}, targetCursorCircle);
        // newTargetCircle.pointDefId = pointDefId;
        // return newTargetCircle;
    }

    private isPointingTargetElement(targetElement: ITargetField, targetCursorCircle: SvgCircleElement): boolean {

        // dx and dy are the vertical and horizontal distances
        var dx = targetElement.cx - targetCursorCircle.cx;
        var dy = targetElement.cy - targetCursorCircle.cy;

        // Determine the straight-line distance between centers.
        var d = Math.sqrt((dy * dy) + (dx * dx));

        var isPointingTarget = (targetElement.r + (targetElement.strokeWidth / 2) + targetCursorCircle.r + (targetCursorCircle.strokeWidth / 2)) >= d;

        // if (isPointingTarget) {
        //     console.debug((" " + targetElement.r + " " + targetElement.strokeWidth + " " + targetCursorCircle.r + " " + targetCursorCircle.strokeWidth) + " >= " + d);
        //     console.debug((targetElement.r + targetElement.strokeWidth + targetCursorCircle.r + targetCursorCircle.strokeWidth) + " >= " + d);
        //     console.debug(("Pointing tatget of pointDefId: " + targetElement.pointDefId));
        // }
        return isPointingTarget;
    }
}

export class UserInputPosition {
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
}


export class SvgPointElement {
    x: number;
    y: number;
}

export class SvgCircleElement {
    cx: number;
    cy: number;
    r: number;
    strokeWidth: number;
    stroke: string;
    fill: string;
    pointDefId: number;
}

export class SvgCirclePointElement extends SvgCircleElement {
    x: number;
    y: number;
}