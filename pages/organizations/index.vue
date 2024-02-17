<template>
  <div>
    <HeaderPage
      title="Organizations"
      link="/organizations/create"
      showBtn
      titleBtn="Create Organization" />
    <div class="tw-my-8">
      <div v-if="ready">
        <div v-if="!error.isError">
          <div v-if="check.checkEmpty(organizations)">
            <v-card>
              <DataTable :value="organizations">
                <Column field="imageUrl" header="" class="tw-w-2/12 tw-py-2">
                  <template #header>
                    <div class="tw-py-5"></div>
                  </template>
                  <template #body="slotProps">
                    <div
                      class="tw-flex tw-justify-center"
                      v-if="slotProps.data.imageUrl">
                      <img
                        @click="
                          openDialog(
                            `${config.public.firebaseBaseUrl}${slotProps.data.imageUrl}`
                          )
                        "
                        :src="`${config.public.firebaseBaseUrl}${slotProps.data.imageUrl}`"
                        class="tw-w-16 tw-h-16 tw-object-cover tw-rounded-xl tw-p-2" />
                    </div>
                    <div
                      v-else
                      class="tw-font-semibold tw-text-xs tw-flex tw-justify-center tw-text-black">
                      NO IMAGE
                    </div>
                  </template>
                </Column>
                <Column field="name" header="ชื่อ"></Column>
                <Column field="actionButton" header="" class="tw-w-2/12">
                  <template #body="slotProps">
                    <div
                      :class="slotProps.data.imageUrl ? '' : 'tw-py-8'"
                      class="tw-space-x-4 tw-mr-4 tw-flex tw-justify-end">
                      <NuxtLink
                        :to="`/organizations/edit/${slotProps.data.organizationId}`">
                        <v-icon class="tw-cursor-pointer">mdi-pencil</v-icon>
                      </NuxtLink>
                      <v-icon
                        color="error"
                        class="tw-cursor-pointer"
                        @click="deleteOrganization(slotProps.data.adminId, slotProps.data.name)"
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
            name="NOT HAVE ANY ORGANIZATIONS"
            desc="PLEASE ADD ORGANIZATION IN ORGANIZATIONS PAGE" />
        </div>
        <MessageError v-else />
      </div>
      <Loading v-else />
    </div>
    <ImagePreview
      :status="dialog.openDialog"
      :img="dialog.image"
      @update-status="closeDialog" />
  </div>
</template>
<script>
import { useRuntimeConfig } from 'nuxt/app'
import { useCheck } from '~/composables/check'
import OrganizationProvider from '~/resources/OrganizationProvider'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      OrganizationService: new OrganizationProvider(),
      organizations: [],
      config: useRuntimeConfig(),
      check: useCheck(),
      ready: false,
      dialog: {
        openDialog: false,
        image: null
      },
      error: {
        isError: false,
        message: ''
      }
    }
  },
  mounted () {
    this.getOrganization()
  },
  methods: {
    async getOrganization () {
      const status = await this.OrganizationService.getOrganization()
      if (status.message === 'success') {
        this.organizations = JSON.parse(JSON.stringify(status.data))
      } else {
        this.error.isError = true
      }
      this.ready = true
    },
    async deleteOrganization (id, name) {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: `คุณต้องการจะลบองค์กร ${name}`,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'ต้องการลบ',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const status = await this.OrganizationService.deleteOrganization(id)
          if (status.message === 'success') {
            this.getOrganization()
            Swal.fire({
              icon: 'success',
              title: 'Delete Organization Success',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Delete Organization Fail',
            })
          }
        }
      })
    },
    openDialog (image) {
      this.dialog.image = image
      this.dialog.openDialog = !!this.dialog.image
    },
    closeDialog () {
      this.dialog.openDialog = false
      this.dialog.image = null
    },
  }
}
</script>
