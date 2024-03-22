<template>
  <div>
    <HeaderPage
      title="Career Groups"
      link="/groups/create"
      showBtn
      titleBtn="Create Career Groups" />
    <div class="tw-my-8">
      <div v-if="ready">
        <div v-if="!error.isError">
          <div v-if="check.checkEmpty(groups)">
            <v-card>
              <DataTable :value="groups">
                <Column field="name" header="ชื่อ">
                  <template #header>
                    <div class="tw-py-6 tw-px-3"></div>
                  </template>
                  <template #body="slotProps">
                    <div class="tw-px-6">{{ slotProps.data.name }}</div>
                  </template>
                </Column>
                <Column field="sections" header="สายงาน">
                  <template #body="slotProps">
                    <div class="tw-flex tw-gap-4">
                      <div
                        v-for="(section, indexSection) in slotProps.data.sections"
                        :key="`sections-${indexSection}`">
                        <p
                          class="tw-px-3 tw-border-2 tw-border-gray-500 tw-rounded-full tw-py-2">
                          {{ section.name }}
                        </p>
                      </div>
                    </div>
                  </template>
                </Column>
                <Column field="actionButton" header="" class="tw-w-2/12">
                  <template #body="slotProps">
                    <div
                      class="tw-space-x-4 tw-mr-4 tw-flex tw-justify-end tw-py-5">
                      <NuxtLink :to="`/groups/edit/${slotProps.data.groupId}`">
                        <v-icon class="tw-cursor-pointer">mdi-pencil</v-icon>
                      </NuxtLink>
                      <v-icon
                        color="error"
                        class="tw-cursor-pointer"
                        @click="deleteGroup(slotProps.data.groupId, slotProps.data.name)"
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
            name="NOT HAVE ANY CAREER GROUPS"
            desc="PLEASE ADD CAREER GROUP IN CAREER GROUPS PAGE" />
        </div>
        <MessageError v-else />
      </div>
      <Loading v-else />
    </div>
  </div>
</template>
<script>
import { useCheck } from '~/composables/check'
import GroupProvider from '~/resources/GroupProvider'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      GroupService: new GroupProvider(),
      groups: [],
      check: useCheck(),
      ready: false,
      error: {
        isError: false,
        message: ''
      }
    }
  },
  mounted () {
    this.getGroup()
  },
  methods: {
    async getGroup () {
      const status = await this.GroupService.getGroup()
      if (status.message === 'success') {
        this.groups = JSON.parse(JSON.stringify(status.data))
      } else {
        this.error.isError = true
      }
      this.ready = true
    },
    async deleteGroup (id, name) {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: `คุณต้องการจะลบกลุ่มสายงาน ${name}`,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'ต้องการลบ',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const status = await this.GroupService.deleteGroup(id)
          if (status.message === 'success') {
            this.getGroup()
            Swal.fire({
              icon: 'success',
              title: 'Delete Group Success',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Delete Group Fail',
            })
          }
        }
      })
    },
  }
}
</script>
