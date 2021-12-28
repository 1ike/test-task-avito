import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
  RouteReuseStrategy,
  DetachedRouteHandle,
  UrlSegment,
} from '@angular/router';


export class AppRouteReuseStrategy
  extends BaseRouteReuseStrategy
  implements RouteReuseStrategy {
  storedHandles: { [key: string]: DetachedRouteHandle } = {};

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data?.['reuseRoute'] || false;
  }

  override store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle,
  ): void {
    const id = this.createIdentifier(route);
    if (route.data?.['reuseRoute']) {
      this.storedHandles[id] = handle;
    }
  }

  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const id = this.createIdentifier(route);
    const handle = this.storedHandles[id];
    const canAttach = !!route.routeConfig && !!handle;
    return canAttach;
  }

  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const id = this.createIdentifier(route);
    if (!route.routeConfig || !this.storedHandles[id]) return null;
    return this.storedHandles[id];
  }

  private createIdentifier(route: ActivatedRouteSnapshot) {
    // Build the complete path from the root to the input route
    const segments: UrlSegment[][] = route.pathFromRoot.map((r) => r.url);
    const subpaths = ([] as UrlSegment[])
      .concat(...segments)
      .map((segment) => segment.path);
    // Result: ${route_depth}-${path}
    return segments.length + '-' + subpaths.join('/');
  }
}
