<template>
  <div>
    <HeaderPage
      title="Admins"
      link="/admins/create"
      showBtn
      titleBtn="Create Admin" />
    <div class="tw-my-8">
      <div v-if="ready">
        <div v-if="!error.isError && user.role === 'owner'">
          <div v-if="check.checkEmpty(admins)">
            <v-card>
              <DataTable :value="admins">
                <Column field="name" header="ชื่อ">
                  <template #header>
                    <div class="tw-py-6 tw-px-3"></div>
                  </template>
                  <template #body="slotProps">
                    <div class="tw-px-6">{{ slotProps.data.name }}</div>
                  </template>
                </Column>
                <Column field="email" header="อีเมล" />
                <Column field="role" header="ตำแหน่ง" />
                <Column field="actionButton" header="" class="tw-w-2/12">
                  <template #body="slotProps">
                    <div
                      class="tw-space-x-4 tw-mr-4 tw-flex tw-justify-end tw-py-5">
                      <NuxtLink :to="`/admins/edit/${slotProps.data.userId}`">
                        <v-icon class="tw-cursor-pointer">mdi-pencil</v-icon>
                      </NuxtLink>
                      <v-icon
                        color="error"
                        class="tw-cursor-pointer"
                        @click="deleteAdmin(slotProps.data.userId, slotProps.data.name)"
                        >mdi-delete</v-icon
                      >
                    </div>
                  </template>
                </Column>
              </DataTable>
            </v-card>
          </div>
          <EmptyData
            v-else
            name="NOT HAVE ANY ADMINS"
            desc="PLEASE ADD ADMIN IN ADMINS PAGE" />
        </div>
        <MessageError v-else />
      </div>
      <Loading v-else />
    </div>
  </div>
</template>
<script>
import { useCheck } from '~/composables/check';
import AdminProvider from '~/resources/AdminProvider'
import { getAuthDecode } from '~/utils/Auth'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      AdminService: new AdminProvider(),
      admins: [],
      check: useCheck(),
      ready: false,
      user: {
        email: '',
        role: ''
      },
      error: {
        isError: false,
        message: ''
      }
    }
  },
  mounted () {
    this.getAdmin()
    this.getAuth()
  },
  methods: {
    async getAdmin () {
      const status = await this.AdminService.getAdmin()
      if (status.message === 'success') {
        this.admins = JSON.parse(JSON.stringify(status.data))
      } else {
        this.error.isError = true
      }
      this.ready = true
    },
    getAuth () {
      const data = getAuthDecode()
      if (data) {
        this.user = data
      }
    },
    async deleteAdmin (id, name) {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: `คุณต้องการจะลบแอดมิน ${name}`,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'ต้องการลบ',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const status = await this.AdminService.deleteAdmin(id)
          if (status.message === 'success') {
            this.getAdmin()
            Swal.fire({
              icon: 'success',
              title: 'Delete Admin Success',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Delete Admin Fail',
            })
          }
        }
      })
    }
  }
}
</script>
