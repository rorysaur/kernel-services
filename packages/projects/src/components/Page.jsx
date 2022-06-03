/**
 * Copyright (c) Kernel
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Link } from 'react-router-dom'
import { useServices, Footer, Navbar } from '@kernel/common'
import AppConfig from 'App.config'

const ADMIN_ROLE = 100

const editMenuItem = ({ projectHandle }) => {
  return (
    <Link
      key='edit'
      className='text-kernel-white px-3 py-4 lg:px-6 lg:py-2 flex items-center text-sm lowercase font-bold'
      to={`/edit/${projectHandle}`}
    >
      Edit
    </Link>
  )
}

const Page = ({ projectHandle, projectMeta, children }) => {
  const { currentUser } = useServices()
  const user = currentUser()
  const isAdmin = user && user.role <= ADMIN_ROLE
  const validOwners = [user.iss].concat(user.groupIds)
  const canEdit = projectMeta && (validOwners.includes(projectMeta.owner) || isAdmin)

  const additionalMenuItems = (projectHandle && canEdit) ? [editMenuItem({ projectHandle })] : []

  return (
    <div className='flex flex-col h-screen justify-between'>
      <Navbar
        title={AppConfig.appTitle}
        logoUrl={AppConfig.logoUrl}
        homeUrl={AppConfig.homeUrl}
        menuLinks={AppConfig.navbar?.links}
        additionalMenuItems={additionalMenuItems}
        backgroundColor='bg-kernel-dark' textColor='text-kernel-white'
      />
      <div className='mb-auto mx-24 py-24'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Page
