interface MyInterface3 {
    new (e: any): IEchartInstance;
}

interface IEchartInstance {
  touchLegend(e: MouseEvent): any;
  showToolTip(e: MouseEvent): void;
}

declare module '@qiun/ucharts' {
    function foo(): string; 
    b = new foo
    export = b as MyInterface3
}
declare module 'uview-plus' {
  export = b as Plugin<[]>
}