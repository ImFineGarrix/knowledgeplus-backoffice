<template>
  <div>
    <HeaderPage
      title="Courses"
      link="/courses/create"
      showBtn
      titleBtn="Create Course" />
    <div class="tw-my-8">
      <div v-if="ready">
        <div v-if="!error.isError">
          <div v-if="check.checkEmpty(courses)">
            <v-card>
              <DataTable :value="courses">
                <Column field="name" header="ชื่อ">
                  <template #header>
                    <div class="tw-py-6 tw-px-3"></div>
                  </template>
                  <template #body="slotProps">
                    <div class="tw-px-6">{{ slotProps.data.name }}</div>
                  </template>
                </Column>
                <Column field="courseType" header="ประเภท">
                  <template #body="slotProps">
                    <p>
                      {{ renameSoftAndHardSkill(slotProps.data.courseType) }}
                    </p>
                  </template>
                </Column>
                <Column field="organization.name" header="องค์กร" />
                <Column field="learnHours" header="เวลา (ชั่วโมง)" />
                <Column field="academicYear" header="ปี (ค.ศ.)" />
                <Column field="actionButton" header="" class="tw-w-2/12">
                  <template #body="slotProps">
                    <div
                      class="tw-space-x-4 tw-mr-4 tw-flex tw-justify-end tw-py-5">
                      <NuxtLink
                        :to="`/courses/edit/${slotProps.data.courseId}`">
                        <v-icon class="tw-cursor-pointer">mdi-pencil</v-icon>
                      </NuxtLink>
                      <v-icon
                        color="error"
                        class="tw-cursor-pointer"
                        @click="deleteCourse(slotProps.data.courseId, slotProps.data.name)"
                        >mdi-delete</v-icon
                      >
                    </div>
                  </template>
                </Column>
              </DataTable>
            </v-card>
            <div class="tw-my-4">
              <v-pagination
                v-model="page"
                :length="pages"
                :total-visible="7"></v-pagination>
            </div>
          </div>
          <EmptyData
            v-else
            name="NOT HAVE ANY COURSES"
            desc="PLEASE ADD COURSE IN COURSES PAGE" />
        </div>
        <MessageError v-else />
      </div>
      <Loading v-else />
    </div>
  </div>
</template>
<script>
import CourseProvider from '~/resources/CourseProvider'
import { useCheck } from '~/composables/check'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      CourseService: new CourseProvider(),
      courses: [],
      ready: false,
      page: 1,
      pages: 1,
      total: 0,
      limit: 10,
      check: useCheck(),
      error: {
        isError: false,
        message: ''
      }
    }
  },
  watch: {
    page(newVal) {
      this.page = newVal
      this.getCourse()
    },
  },
  mounted() {
    this.getCourse()
  },
  methods: {
    getPages() {
      return Math.ceil(this.total / this.limit)
    },
    async getCourse () {
      const status = await this.CourseService.getCourse(this.page, this.limit)
      if (status.message === 'success') {
        const { data } = status
        this.courses = JSON.parse(JSON.stringify(data.courses))
        this.page = data.pagination.page
        this.total = data.pagination.total
        this.pages = this.getPages()
      } else {
        this.error.isError = true
      }
      this.ready = true
    },
    async deleteCourse (id, name) {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: `คุณต้องการจะลบคอร์ส ${name}`,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'ต้องการลบ',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const status = await this.CourseService.deleteCourse(id)
          if (status.message === 'success') {
            this.getCourse()
            Swal.fire({
              icon: 'success',
              title: 'Delete Course Success',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Delete Course Fail',
            })
          }
        }
      })
    },
    renameSoftAndHardSkill (type) {
      if (type === 'SOFT') {
        return 'Soft Skill'
      }
      if (type === 'HARD') {
        return 'Hard Skill'
      }
      return ''
    },
  }
}
</script>
