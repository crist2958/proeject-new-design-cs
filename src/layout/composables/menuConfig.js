import { markRaw, ref } from 'vue'
//zona de importacion de iconos
import CalendarIcon from '@/assets/icons/sidebar/calendar-01.svg?component'
import OrderServiceIcon from '@/assets/icons/sidebar/order-service.svg?component'
import RecepcionIcon from '@/assets/icons/sidebar/recepcion.svg?component'
import ServiceIcon from '@/assets/icons/sidebar/servicios.svg?component'
import ClientsIcon from '@/assets/icons/sidebar/clientes.svg?component'
import EnterpriseIcon from '@/assets/icons/sidebar/empresas.svg?component'
import CotizacionIcon from '@/assets/icons/sidebar/bar-chart-square-up-01.svg?component'
import RoleIcon from '@/assets/icons/sidebar/User_Card_ID.svg?component'
import PersonalIcon from '@/assets/icons/sidebar/User.svg?component'
import ProductIcon from '@/assets/icons/sidebar/box.svg?component'
import SettingIcon from '@/assets/icons/sidebar/Settings.svg?component'
import LogoutIcon from '@/assets/icons/sidebar/Log_Out.svg?component'



export const useMenu = () => {
  const menuItems = ref([
    {
      label: 'Calendario',
      icon: markRaw(CalendarIcon), 
      to: '/calendar',
    },
    {
      label: 'Orden de servicio',
      icon: markRaw(OrderServiceIcon),
      to: '/Order-service',
    },
    {
      label: 'Recepción',
      icon: markRaw(RecepcionIcon),
      to: '/recepcion',
    },
    {
      label: 'Servicios',
      icon: markRaw(ServiceIcon),
      to: '/service',
    },
    {
      label: 'Clientes',
      icon: markRaw(ClientsIcon),
      to: '/clients'   
    },
    {
      label: 'Empresas',
      icon: markRaw(EnterpriseIcon),
      to: '/Enterprise'   
    },
    {
      label: 'Cotizaciones',
      icon: markRaw(CotizacionIcon), 
      to: '/cotizacion',
    },
    {
      label: 'Roles',
      icon: markRaw(RoleIcon), 
      to: '/Order-service',
    },
    {
      label: 'Personal',
      icon: markRaw(PersonalIcon),
      to: '/personal',
    },
    {
      label: 'Productos',
      icon: markRaw(ProductIcon),
      to: '/product',
    },
    {
      label: 'Configuración',
      icon: markRaw(SettingIcon),
      to: '/Config'   
    },
    {
      label: 'Cerrar sesión',
      icon: markRaw(LogoutIcon),
      to: '/Logout'   
    }
  ])

  return {
    menuItems
  }
}