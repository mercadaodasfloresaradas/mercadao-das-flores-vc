export interface IServiceRoutes {
  [id: string]: string | (() => IServiceRoutes);
}
