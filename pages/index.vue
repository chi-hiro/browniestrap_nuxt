<script setup lang="ts">
import { pageback, pagetop } from '@/lib/mixins'
import { toast } from '@/lib/toast'
import { openViewer } from '@/lib/viewer'

import Visual from '@/components/web/Visual.vue'
import Headline from '@/components/web/Headline.vue'
import Carousel from '@/components/carousel/Carousel.vue'

import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Chip from '@/components/ui/Chip.vue'
import Divider from '@/components/ui/Divider.vue'
import Expansion from '@/components/ui/Expansion.vue'
import Icon from '@/components/ui/Icon.vue'
import Loader from '@/components/ui/Loader.vue'
import Modal from '@/components/ui/Modal.vue'
import Skelton from '@/components/ui/Skelton.vue'

import Checkbox from '@/components/form/Checkbox.vue'
import Quantity from '@/components/form/Quantity.vue'
import Switch from '@/components/form/Switch.vue'
import Textfield from '@/components/form/Textfield.vue'

const state = reactive({
  modeltest1: 'dummy',
  modeltest2: false,
  modeltest3: true,
  modeltest4: '10',
  modeltest5: 1,
  modeltest6: 'example-radio1',
})

const basicModal = ref<InstanceType<typeof Modal>>()
const scrollModal = ref<InstanceType<typeof Modal>>()
</script>

<template>
  <Visual>
    <h1 class="title">LEAD SAMPLE</h1>
    <p class="description">DESCRIPTION SAMPLE</p>
  </Visual>

  <section id="section_type" class="section border-t reveal">
    <div class="container">
      <h2 class="section-heading">タイポ</h2>

      <h1>h1. 見出し</h1>
      <h2>h2. 見出し</h2>
      <h3>h3. 見出し</h3>
      <h4>h4. 見出し</h4>
      <h5>h5. 見出し</h5>
      <h6>h6. 見出し</h6>

      <hr />

      <h3 class="section-heading-sm">
        <span class="reveal reveal-cover">早い話、速いです。</span>
      </h3>
      <p class="lead">iPhoneなら5Gを<br />最大限に使えます</p>
      <p>
        iPhoneの5Gは超高速です。映画のダウンロードは一瞬。ビデオのストリーミングは一段と高画質。HDのFaceTime通話は携帯電話ネットワークで楽しめます。データの遅延も大幅に少なくなるでしょう。しかもiPhone
        12は、より幅広いサービスエリアを世界中でカバーするので、より多くの場所で5Gが使えます。
      </p>
      <p>
        広角カメラと超広角カメラの両方で、ナイトモードが使えるようになりました。暗い場所でも見たことがないほど美しい写真を撮れます。新しい広角カメラは光を27パーセントも多く取り込むので、太陽の下でも月明かりの下でも、一段と精細であざやかな一枚を撮影できます。
      </p>

      <p class="text-lg">
        広角カメラと超広角カメラの両方で、ナイトモードが使えるようになりました。暗い場所でも見たことがないほど美しい写真を撮れます。新しい広角カメラは光を27パーセントも多く取り込むので、太陽の下でも月明かりの下でも、一段と精細であざやかな一枚を撮影できます。
      </p>
      <p class="text-sm">
        広角カメラと超広角カメラの両方で、ナイトモードが使えるようになりました。暗い場所でも見たことがないほど美しい写真を撮れます。新しい広角カメラは光を27パーセントも多く取り込むので、太陽の下でも月明かりの下でも、一段と精細であざやかな一枚を撮影できます。
      </p>

      <ul>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Consectetur adipiscing elit</li>
        <li><a href="">Integer molestie lorem at massa</a></li>
      </ul>

      <ol class="list-chart">
        <li>Lorem ipsum dolor sit amet</li>
        <li>Consectetur adipiscing elit</li>
        <li>Integer molestie lorem at massa</li>
      </ol>

      <p>You can use the mark tag to <mark>highlight</mark> text. <code>code</code></p>

      <blockquote class="blockquote">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
      </blockquote>
    </div>
  </section>

  <section class="section-cover text-center reveal-group snap-start">
    <div class="container text-white reveal reveal-fade-up">
      <h2 class="section-heading">カバー</h2>
      <p>背景に画像を入れた段落</p>
      <p>
        <Button model="border md" color="white" title="ボタン" />
      </p>
    </div>

    <span
      class="embed embed-1by1 lg:embed-21by9 section-cover-bg overlay reveal reveal-fade-back"
      style="background-image: url(/dummy/dummy2.webp)"
    ></span>
  </section>

  <section class="section-grid border-t reveal">
    <div class="grid lg:grid-cols-2 reveal-group">
      <div class="lg:grid-span-1 section-grid-body reveal reveal-fade-up">
        <div class="container">
          <h2 class="section-heading text-left">200種類以上のプチゲームに挑戦する「ストーリー」モード</h2>
          <p>
            「ストーリー」モードでは、元の世界に戻るために、仲間を増やしながら、各ステージのプチゲームやボスに挑戦します。各ステージでは、仲間の中からゲームに参加するキャラクターたちを選びます。
          </p>
          <p>
            キャラクターごとにアクションが異なるので、ステージの特徴やチームのバランスを考えたキャラクター選択が重要になります。
          </p>
          <p>
            Joy-Conをおすそわけすれば、全てのステージで2人同時プレイも可能です。ストーリーを進めていくことで、他のモードも遊べるようになりますよ。
          </p>
        </div>
      </div>

      <div class="lg:grid-span-1 section-grid-img reveal reveal-mask-left">
        <figure class="embed embed-4by3">
          <img src="/dummy/dummy5.webp" alt="" loading="lazy" />
        </figure>
      </div>
    </div>
  </section>

  <section id="section_skelton" class="section border-t">
    <div class="container">
      <h2 class="section-heading">Skelton</h2>

      <div class="grid grid-cols-2 gap-40px">
        <div>
          <Skelton :ratio="[16, 9]" :animate="true" class="mb-1" />
          <Skelton model="text" :line="3" :animate="true" />
        </div>

        <div>
          <div class="flex items-center gap-0.5 mb-1">
            <Skelton model="rounded" width="48px" height="48px" :animate="true" />
            <Skelton model="text" :line="1" width="80px" :animate="true" />
          </div>

          <Skelton model="h1" width="60%" :animate="true" class="mb-1" />
          <Skelton model="text" :line="7" :animate="true" />
        </div>
      </div>
    </div>
  </section>

  <section id="section_carousel" class="section border-t reveal">
    <div class="container">
      <h2 class="section-heading">Carousel</h2>
    </div>

    <div class="mb-3">
      <Carousel
        model="slide"
        :pagination="true"
        :ratio="[16, 9]"
        :src="[{ src: '/dummy/visual1_lg.webp' }, { src: '/dummy/visual2_lg.webp' }, { src: '/dummy/visual3_lg.webp' }]"
      />
    </div>

    <div class="container">
      <Carousel
        model="lineup"
        :zoom="true"
        :nav="true"
        :ratio="[1, 1]"
        :src="[
          { src: '/dummy/dummy1_thumb.webp', url: '/test' },
          { src: '/dummy/dummy2_thumb.webp', url: '/test' },
          { src: '/dummy/dummy3_thumb.webp', url: '/test' },
          { src: '/dummy/dummy4_thumb.webp', url: '/test' },
          { src: '/dummy/dummy5_thumb.webp', url: '/test' },
          { src: '/dummy/dummy1_thumb.webp', url: '/test' },
          { src: '/dummy/dummy2_thumb.webp', url: '/test' },
          { src: '/dummy/dummy3_thumb.webp', url: '/test' },
          { src: '/dummy/dummy4_thumb.webp', url: '/test' },
          { src: '/dummy/dummy5_thumb.webp', url: '/test' },
        ]"
      />
    </div>
  </section>

  <section id="section_card" class="section section-bg-even border-t reveal">
    <div class="container">
      <h2 class="section-heading">Card</h2>

      <h3 class="section-heading-sm">画像付き</h3>

      <div class="grid gap-20px lg:gap-40px md:grid-cols-2 lg:grid-cols-3 reveal-group">
        <div class="reveal reveal-fade-up">
          <Card src="/dummy/dummy1_thumb.webp" title="ワイヤレスコントローラーに新色登場！">
            <Chip model="bg sm" color="primary" title="News" />
            <h4>DualSense ワイヤレスコントローラーに新色登場！</h4>
            <small>2022.10.16</small>
            <p class="text-clamp-3">「銀河」にインスパイアされた 2 種類のカラーで、どこまでも広がる遊びの世界へ。</p>
          </Card>
        </div>

        <div class="reveal reveal-fade-up">
          <Card
            model="text"
            color="secondary"
            src="/dummy/dummy2_thumb.webp"
            href="/"
            title="目を凝らして見る世界、その絶叫は仲間に届いていなかった—"
          >
            <Chip model="bg sm" color="secondary" title="Column" />
            <h4>目を凝らして見る世界、その絶叫は仲間に届いていなかった—</h4>
            <small>2022.10.16</small>
            <p class="text-clamp-3">
              『FINAL FANTASY VII REMAKE INTERGRADE』は、大人気かつ受賞歴もある『FINAL FANTASY VII REMAKE』をPlayStation
              5向けにライティングや質感、背景などの表現力を向上し、ユフィを主人公とした新規エピソード「FF7R EPISODE
              INTERmission」などの新要素を追加した作品だ。
            </p>
          </Card>
        </div>

        <div class="reveal reveal-fade-up">
          <Card
            model="bg"
            color="danger"
            src="/dummy/dummy3_thumb.webp"
            href="/"
            title="初公開の新作や、注目タイトルの最新情報をチェックしよう"
          >
            <Chip model="bg sm" color="white" title="Tips" />
            <h4>初公開の新作や、注目タイトルの最新情報をチェックしよう</h4>
            <small>2022.10.16</small>
            <p class="text-clamp-3">
              氷に覆われた文明崩壊後のロサンゼルスから、スナイパーのスコープから覗く第2次世界大戦まで、魅力的な体験がゾクゾク。
            </p>
          </Card>
        </div>
      </div>

      <h3 class="section-heading-sm">通知</h3>

      <Card icon="info" class="mb-1">
        <strong>Well done!</strong> You successfully read this important alert message.
      </Card>

      <Card model="text" color="success" icon="check_circle" class="mb-1">
        <strong>Well done!</strong> You successfully read this important alert message.
      </Card>

      <Card model="text" color="info" class="mb-1">
        <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
      </Card>

      <Card model="text" color="warning" icon="warning" class="mb-1">
        <strong>Warning!</strong> Better check yourself, you're not looking too good.
      </Card>

      <Card model="text" color="danger" icon="cancel" class="mb-1">
        <strong>Oh snap!</strong> Change a few things up and try submitting again.
      </Card>

      <Card model="bg" color="success" icon="check_circle" class="mb-1">
        <strong>Well done!</strong> You successfully read this important alert message.
      </Card>

      <Card model="bg" color="info" icon="info" class="mb-1">
        <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
      </Card>

      <Card model="bg" color="warning" icon="warning" class="mb-1">
        <strong>Warning!</strong> Better check yourself, you're not looking too good.
      </Card>

      <Card model="bg" color="danger" icon="cancel" class="mb-1">
        <strong>Oh snap!</strong> Change a few things up and try submitting again.
      </Card>

      <div class="grid lg:flex gap-0.5">
        <Button
          model="bg sm"
          color="success"
          @click="toast('success', 'You successfully read this important alert message.')"
          title="Toast"
        />

        <Button
          model="bg sm"
          color="info"
          @click="toast('info', 'This alert needs your attention, but it\'s not super important.', 'left')"
          title="Toast(left)"
        />

        <Button
          model="bg sm"
          color="warning"
          @click="toast('warning', 'Better check yourself, you\'re not looking too good.', 'right')"
          title="Toast(right)"
        />

        <Button
          model="bg sm"
          color="danger"
          @click="toast('danger', 'Change a few things up and try submitting again.', 'bottom')"
          title="Toast(bottom)"
        />
      </div>

      <div class="grid lg:flex gap-0.5 mt-0.5">
        <Button
          model="bg sm"
          color="success"
          @click="toast('success', 'You successfully read this important alert message.', 'top', 'x')"
          title="Toast(top, x)"
        />

        <Button
          model="bg sm"
          color="info"
          @click="toast('info', 'This alert needs your attention, but it\'s not super important.', 'left', 'x')"
          title="Toast(left, x)"
        />

        <Button
          model="bg sm"
          color="warning"
          @click="toast('warning', 'Better check yourself, you\'re not looking too good.', 'right', 'x')"
          title="Toast(right, x)"
        />

        <Button
          model="bg sm"
          color="danger"
          @click="toast('danger', 'Change a few things up and try submitting again.', 'bottom', 'x')"
          title="Toast(bottom, x)"
        />
      </div>
    </div>
  </section>

  <section id="section_headline" class="section border-t">
    <div class="container">
      <div class="lg:flex">
        <h2 class="section-heading lg:w-1/3">Headline</h2>

        <div class="grid reveal-group lg:w-2/3">
          <Headline
            href="/"
            date="2021-12-24"
            title="「よゐこのはじめてのプログラミング生活 第２回あそぶ編」（前編）を公開。視聴者のみなさんがつくったゲームをプレイします。"
            model="border"
            :chip="{ label: 'お知らせ', color: 'primary' }"
          />

          <Headline
            href="/"
            date="2021-10-02"
            title="『スプラトゥーン3』の最新調査映像が公開。新たなステージやスペシャルウェポン、ヒーローモードの情報が判明。"
            model="border"
            :chip="{ label: '重要', color: 'danger' }"
          />

          <Headline
            href="/"
            date="2021-09-24"
            title="シリーズ完全新作、Nintendo Switch『ベヨネッタ3』が2022年に発売決定。大魔獣を直接操作する新たなアクションも明らかに。"
            model="border"
            :chip="{ label: 'プレスリリース', color: 'secondary' }"
          />

          <Headline
            date="2021-09-01"
            title="Nintendo Switch『ゼルダ無双
              厄災の黙示録』追加コンテンツ「エキスパンション・パス」第２弾のトレーラーが公開に。10月29日（金）に配信決定。"
            model="border"
            :chip="{ label: 'お知らせ', color: 'primary' }"
            :rows="2"
          />
        </div>
      </div>
    </div>
  </section>

  <section id="section_button" class="section border-t">
    <div class="container">
      <h2 class="section-heading">Button</h2>

      <h3 class="section-heading-sm">Bg</h3>
      <div class="flex flex-wrap gap-0.5">
        <Button model="bg md blockDown rounded" color="primary" title="Primary" />
        <Button model="bg md blockDown rounded" color="secondary" title="Secondary" />
        <Button model="bg md blockDown rounded" color="success" title="Success" />
        <Button model="bg md blockDown rounded" color="info" title="Info" />
        <Button model="bg md blockDown rounded" color="warning" title="Warning" />
        <Button model="bg md blockDown rounded" color="danger" title="Danger" />
        <Button model="bg md blockDown rounded" color="white" title="White" />
        <Button model="bg md blockDown rounded" color="default" title="Default" />
        <Button model="bg md blockDown rounded" color="primary-secondary" title="Primary-Secondary" />
        <Button model="bg md blockDown rounded" color="secondary-primary" title="Secondary-Primary" />
      </div>

      <h3 class="section-heading-sm">Border</h3>
      <div class="flex flex-wrap gap-0.5">
        <Button model="border md blockDown rounded" color="primary" title="Primary" />
        <Button model="border md blockDown rounded" color="secondary" title="Secondary" />
        <Button model="border md blockDown rounded" color="success" title="Success" />
        <Button model="border md blockDown rounded" color="info" title="Info" />
        <Button model="border md blockDown rounded" color="warning" title="Warning" />
        <Button model="border md blockDown rounded" color="danger" title="Danger" />
        <Button model="border md blockDown rounded" color="white" title="White" />
        <Button model="border md blockDown rounded" color="default" title="Default" />
      </div>

      <h3 class="section-heading-sm">Other</h3>
      <div class="flex flex-wrap gap-0.5">
        <Button model="link md blockDown" color="primary" title="link primary" />
        <Button model="bg md blockDown" color="primary" :disabled="true" title="disabled" />
        <Button model="bg md long" color="primary" :loading="true" title="bg loading" />
        <Button model="border md long" color="primary" :loading="true" title="border loading" />
      </div>

      <h3 class="section-heading-sm">Icon</h3>
      <div class="flex flex-wrap gap-0.5 items-center">
        <Button model="sm bg blockDown" color="primary" starticon="shopping_cart" title="starticon" />
        <Button model="sm border blockDown" color="primary" endicon="shopping_cart" title="endicon" />
        <Button model="md bg blockDown" color="info" starticon="shopping_cart" title="starticon" />
        <Button model="md border blockDown" color="info" endicon="shopping_cart" title="endicon" />
        <Button model="lg bg blockDown" color="warning" starticon="shopping_cart" title="starticon" />
        <Button model="lg border blockDown" color="warning" endicon="shopping_cart" title="endicon" />
      </div>

      <div class="flex flex-wrap gap-0.5 items-center mt-1">
        <Button model="md long bg" color="primary" starticon="chevron_left" title="long starticon" />
        <Button model="md long bg" color="primary" endicon="chevron_right" title="long endicon" />

        <Button model="sm icon bg rounded" color="danger">
          <Icon value="close" />
        </Button>

        <Button model="md icon border rounded" color="success">
          <Icon value="arrow_forward" />
        </Button>
      </div>

      <h3 class="section-heading-sm">Handling test</h3>
      <div class="flex flex-wrap gap-0.5 items-center">
        <Button model="sm bg blockDown" color="info" @click="pageback" title="History Back" />
        <Button model="sm bg blockDown" color="info" @click="pagetop" title="Page Top" />
      </div>
    </div>
  </section>

  <section id="section_forms" class="section border-t">
    <div class="container">
      <h2 class="section-heading">Form</h2>

      <form>
        <h3 class="section-heading-sm">Textfield</h3>
        <p>v-model: {{ state.modeltest1 }}</p>
        <div class="grid lg:grid-cols-3 gap-2 mb-2">
          <Textfield
            name="basic"
            label="Textfield"
            help="フォームの補足説明がここに入ります。"
            :required="true"
            v-model="state.modeltest1"
          />
          <Textfield
            name="feedback"
            label="Feedback"
            :feedback="{ color: 'danger', message: 'Error message.' }"
            :required="true"
          />
          <Textfield name="disabled" label="Disabled" :disabled="true" model-value="disabled content" />
          <Textfield name="readonly" label="Readonly" :readonly="true" model-value="readonly content" />
          <Textfield name="starticon" type="search" placeholder="Search" starticon="search" />
          <Textfield name="endicon" type="number" label="End Icon" endicon="currency_yen" />
          <Textfield
            name="select"
            type="select"
            label="Select"
            :option="[{ value: 'option1' }, { value: 'option2' }]"
            starticon="calendar_today"
          />
          <Textfield name="password" type="password" label="Password" />
        </div>

        <Divider>または</Divider>

        <div class="mb-1">
          <Textfield name="textarea" type="textarea" label="Message" :maxlength="100" />
        </div>

        <h3 class="section-heading-sm">Checkbox</h3>
        <p>v-model: {{ state.modeltest2 }}</p>
        <div class="flex flex-wrap gap-1 mb-1">
          <Checkbox
            name="example-check"
            value="example-checkbox1"
            label="example-checkbox1"
            v-model="state.modeltest2"
          />
          <Checkbox name="example-check" value="example-checkbox2" :disabled="true" label="example-checkbox2" />
        </div>

        <p>v-model: {{ state.modeltest6 }}</p>
        <div class="flex flex-wrap gap-1 mb-1">
          <Checkbox
            type="radio"
            name="example-radio"
            value="example-radio1"
            label="example-radio1"
            v-model="state.modeltest6"
          />
          <Checkbox
            type="radio"
            name="example-radio"
            value="example-radio2"
            label="example-radio2"
            v-model="state.modeltest6"
          />
        </div>

        <p>v-model: {{ state.modeltest4 }}</p>
        <div class="flex flex-wrap gap-0.5 mb-1">
          <Checkbox
            type="radio"
            model="box md"
            name="example-radiobox"
            value="10"
            label="10"
            v-model="state.modeltest4"
          />
          <Checkbox
            type="radio"
            model="box md"
            name="example-radiobox"
            value="20"
            label="20"
            v-model="state.modeltest4"
          />
        </div>

        <h3 class="section-heading-sm">Switch</h3>
        <p>v-model: {{ state.modeltest3 }}</p>
        <div class="flex gap-1 mb-1">
          <Switch name="example-switch" value="example-switch1" label="Switch 1" v-model="state.modeltest3" />
        </div>

        <h3 class="section-heading-sm">Quantity</h3>
        <p>v-model: {{ state.modeltest5 }}</p>
        <div class="flex gap-0.5">
          <Quantity v-model="state.modeltest5" model="sm" :min="1" :max="99" name="quantity" />
        </div>
      </form>
    </div>
  </section>

  <section id="section_table" class="section border-t">
    <div class="container">
      <h2 class="section-heading">テーブル</h2>

      <h3 class="section-heading-sm">Vertical</h3>
      <div class="table-responsive">
        <table class="table text-sm">
          <thead>
            <tr>
              <th>Heading</th>
              <th>Heading</th>
              <th>Heading</th>
              <th>Heading</th>
              <th>Heading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Content</td>
              <td>Content</td>
              <td>Content</td>
              <td>Content</td>
              <td>Content</td>
            </tr>
            <tr>
              <td>Content</td>
              <td>Content</td>
              <td>Content</td>
              <td>Content</td>
              <td>Content</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="section-heading-sm">Horizontal</h3>
      <table class="table text-sm">
        <tbody>
          <tr>
            <th>対応コントローラー</th>
            <td>Nintendo Switch Proコントローラー</td>
          </tr>
          <tr>
            <th>セーブデータお預かり</th>
            <td>対応</td>
          </tr>
          <tr>
            <th>対応言語</th>
            <td>
              日本語,英語,フランス語,ドイツ語,イタリア語,スペイン語,韓国語,オランダ語,ポルトガル語,ロシア語,中国語
              (簡体字),中国語 (繁体字)
            </td>
          </tr>
        </tbody>
      </table>

      <h3 class="section-heading-sm">Bordered</h3>
      <table class="table table-bordered text-sm">
        <tbody>
          <tr>
            <th>対応コントローラー</th>
            <td>Nintendo Switch Proコントローラー</td>
          </tr>
          <tr>
            <th>セーブデータお預かり</th>
            <td>対応</td>
          </tr>
          <tr>
            <th>対応言語</th>
            <td>
              日本語,英語,フランス語,ドイツ語,イタリア語,スペイン語,韓国語,オランダ語,ポルトガル語,ロシア語,中国語
              (簡体字),中国語 (繁体字)
            </td>
          </tr>
        </tbody>
      </table>

      <h3 class="section-heading-sm">Striped</h3>
      <table class="table table-striped text-sm">
        <tbody>
          <tr>
            <th>対応コントローラー</th>
            <td>Nintendo Switch Proコントローラー</td>
          </tr>
          <tr>
            <th>セーブデータお預かり</th>
            <td>対応</td>
          </tr>
          <tr>
            <th>対応言語</th>
            <td>
              日本語,英語,フランス語,ドイツ語,イタリア語,スペイン語,韓国語,オランダ語,ポルトガル語,ロシア語,中国語
              (簡体字),中国語 (繁体字)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section id="section_loader" class="section border-t">
    <div class="container">
      <h2 class="section-heading">Loader</h2>

      <div class="grid grid-cols-3 gap-1">
        <div class="p-20px bg-muted">
          <h3 class="section-heading-sm text-center">dot</h3>
          <Loader model="dot" :rounded="true" />
        </div>

        <div class="p-20px bg-dark">
          <h3 class="section-heading-sm text-center text-white">spin</h3>
          <Loader model="spin" color="white" />
        </div>

        <div class="p-20px bg-muted">
          <h3 class="section-heading-sm text-center">circle</h3>
          <Loader model="circle" :progress="26" />
        </div>

        <div class="p-20px bg-muted col-span-3">
          <h3 class="section-heading-sm text-center">line</h3>
          <Loader model="line" color="warning" />
        </div>

        <div class="p-20px bg-muted col-span-3">
          <h3 class="section-heading-sm text-center">bar</h3>
          <Loader model="bar" :progress="50" color="success" :rounded="true" />
        </div>
      </div>
    </div>
  </section>

  <section id="section_chip" class="section border-t">
    <div class="container">
      <h2 class="section-heading">Chip</h2>

      <h3 class="section-heading-sm">text</h3>
      <div class="flex flex-wrap gap-0.5">
        <Chip href="/test" model="text sm" color="primary" title="primary" />
        <Chip href="/test" model="text sm" color="secondary" title="secondary" />
        <Chip href="/test" model="text sm" color="success" title="success" />
        <Chip href="/test" model="text sm" color="info" title="info" />
        <Chip href="/test" model="text sm" color="warning" title="warning" />
        <Chip href="/test" model="text sm" color="danger" title="danger" />
        <Chip href="/test" model="text sm" color="white" title="white" />
        <Chip href="/test" model="text sm" color="default" title="default" />
      </div>

      <h3 class="section-heading-sm">bg</h3>
      <div class="flex flex-wrap gap-0.5">
        <Chip href="/test" model="bg sm" color="primary" title="primary" />
        <Chip href="/test" model="bg sm" color="secondary" title="secondary" />
        <Chip href="/test" model="bg sm" color="success" title="success" />
        <Chip href="/test" model="bg sm" color="info" title="info" />
        <Chip href="/test" model="bg sm" color="warning" title="warning" />
        <Chip href="/test" model="bg sm" color="danger" title="danger" />
        <Chip href="/test" model="bg sm" color="white" title="white" />
        <Chip href="/test" model="bg sm" color="default" title="default" />
      </div>

      <h3 class="section-heading-sm">border</h3>
      <div class="flex flex-wrap gap-0.5">
        <Chip href="/test" model="border sm" color="primary" title="primary" />
        <Chip href="/test" model="border sm" color="secondary" title="secondary" />
        <Chip href="/test" model="border sm" color="success" title="success" />
        <Chip href="/test" model="border sm" color="info" title="info" />
        <Chip href="/test" model="border sm" color="warning" title="warning" />
        <Chip href="/test" model="border sm" color="danger" title="danger" />
        <Chip href="/test" model="border sm" color="white" title="white" />
        <Chip href="/test" model="border sm" color="default" title="default" />
      </div>

      <h3 class="section-heading-sm">with Icon</h3>
      <div class="flex flex-wrap items-center gap-0.5">
        <Chip model="text sm rounded" color="primary">
          <Icon value="account_circle" />
          small
        </Chip>
        <Chip model="md rounded">
          <img src="/dummy/dummy4_thumb.webp" alt="" loading="lazy" />
          medium
        </Chip>
        <Chip model="text lg rounded" color="danger">
          large
          <Icon value="cancel" />
        </Chip>
      </div>

      <h3 class="section-heading-sm">status</h3>
      <div class="flex flex-wrap gap-1.5">
        <Chip model="status" color="primary" title="primary" />
        <Chip model="status" color="secondary" title="secondary" />
        <Chip model="status" color="success" title="success" />
        <Chip model="status" color="info" title="info" />
        <Chip model="status" color="warning" title="warning" />
        <Chip model="status" color="danger" title="danger" />
        <Chip model="status" color="white" title="white" />
      </div>

      <h3 class="section-heading-sm">check</h3>
      <div class="flex flex-wrap gap-1.5">
        <Chip model="check" color="primary" title="primary" />
        <Chip model="check" color="secondary" title="secondary" />
        <Chip model="check" color="success" title="success" />
        <Chip model="check" color="info" title="info" />
        <Chip model="check" color="warning" title="warning" />
        <Chip model="check" color="danger" title="danger" />
        <Chip model="check" color="white" title="white" />
      </div>

      <h3 class="section-heading-sm">badge</h3>
      <Button model="bg md" color="primary">
        Sample
        <Chip model="badge" color="danger" title="8" />
      </Button>
    </div>
  </section>

  <section id="section_expansion" class="section border-t">
    <div class="container">
      <h2 class="section-heading">Expansion</h2>

      <h3 class="section-heading-sm">default</h3>
      <Expansion title="Expansion (Click)">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon
        officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
        moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim
        keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
        butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably
        haven't heard of them accusamus labore sustainable VHS.
      </Expansion>

      <h3 class="section-heading-sm">border</h3>
      <Expansion model="border" title="Expansion (Click)">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon
        officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
        moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim
        keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
        butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably
        haven't heard of them accusamus labore sustainable VHS.
      </Expansion>

      <Expansion model="border" title="Expansion (Hover)" :hover="true">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon
        officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
        moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim
        keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
        butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably
        haven't heard of them accusamus labore sustainable VHS.
      </Expansion>

      <h3 class="section-heading-sm">popup →</h3>
      <div class="flex justify-end">
        <Expansion model="popup" title="Expansion (Popup)">
          <ul class="expansion-popup-menu">
            <li>
              <a href="#"> Item 1 </a>
            </li>
            <li>
              <a href="#"> Item 2 </a>
            </li>
            <li>
              <NuxtLink href="/test" class="text-danger">
                <Icon value="delete" />
                Item 3
              </NuxtLink>
            </li>
          </ul>
        </Expansion>
      </div>
    </div>
  </section>

  <section id="section_viewer" class="section border-t">
    <div class="container">
      <h2 class="section-heading">Viewer</h2>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-0.5">
        <div class="col-span-1 lg:col-span-1">
          <a
            class="hover-border"
            href="/dummy/dummy1.webp"
            @click="openViewer"
            data-viewer-group="group1"
            title="画像を拡大表示"
          >
            <figure class="embed embed-1by1">
              <img src="/dummy/dummy1_thumb.webp" width="900" height="900" alt="" loading="lazy" />
            </figure>
          </a>
        </div>

        <div class="col-span-1 lg:col-span-1">
          <a
            class="hover-border"
            href="/dummy/dummy2.webp"
            @click="openViewer"
            data-viewer-group="group1"
            title="画像を拡大表示"
          >
            <figure class="embed embed-1by1">
              <img src="/dummy/dummy2_thumb.webp" width="900" height="900" alt="" loading="lazy" />
            </figure>
          </a>
        </div>

        <div class="col-span-1 lg:col-span-1">
          <a
            class="hover-border"
            href="/dummy/dummy3.webp"
            @click="openViewer"
            data-viewer-group="group1"
            title="画像を拡大表示"
          >
            <figure class="embed embed-1by1">
              <img src="/dummy/dummy3_thumb.webp" width="900" height="900" alt="" loading="lazy" />
            </figure>
          </a>
        </div>

        <div class="col-span-1 lg:col-span-1">
          <a class="hover-border" href="/dummy/dummy4.webp" @click="openViewer" title="画像を拡大表示">
            <figure class="embed embed-1by1">
              <img src="/dummy/dummy4_thumb.webp" width="900" height="900" alt="" loading="lazy" />
            </figure>
          </a>
        </div>
      </div>

      <div class="flex flex-wrap gap-0.5 mt-2">
        <Button
          model="bg md"
          color="primary"
          href="https://www.youtube.com/watch?v=Z2P818AAOn8"
          target="_blank"
          title="YouTube"
          @click="openViewer"
        />
      </div>
    </div>
  </section>

  <section id="section_modal" class="section border-t">
    <div class="container">
      <h2 class="section-heading">Modal</h2>

      <div class="flex flex-wrap gap-0.5">
        <Button model="bg md" color="primary" @click="basicModal?.show($event)" title="Basic" />

        <Modal ref="basicModal">
          <template #body>
            <p>容量がいっぱいでダウンロードできません。</p>
            <p>本体保存メモリーまたはSDカードに、9.3GBの空き容量が必要です。<br />ソフトのデータを整理してください。</p>
          </template>

          <template #footer>
            <button type="button" @click="basicModal?.hide()">とじる</button>
            <button type="button" class="text-primary" @click="scrollModal?.show($event)">つぎへ</button>
          </template>
        </Modal>

        <Button model="bg md" color="primary" @click="scrollModal?.show($event)" title="Scroll" />

        <Modal ref="scrollModal" :scroll="true">
          <template #header>Google 利用規約</template>

          <template #body>
            <div class="terms">
              <p>
                本利用規約には、Google のビジネスの仕組み、Google に適用される法律、および Google
                が常に正しいと信じてきた事柄が反映されています。結果として、本利用規約は、サービスを利用するユーザーと
                Google
                との関係を定義するのに役立っています。たとえば、本規約の見出しには以下のような内容が含まれています。
              </p>
              <ul>
                <li>
                  ユーザーが Google に期待できることでは、Google がサービスを提供および開発する仕組みについて説明します
                </li>
                <li>Google がユーザーに期待することでは、Google のサービスを利用する際のルールについて規定します</li>
                <li>
                  Google サービス内のコンテンツでは、Google
                  のサービス内で見つかるコンテンツの知的所有権について説明し、そのコンテンツがユーザー、Google、または他者のうち誰に帰属するのかを示します
                </li>
                <li>
                  問題または意見の相違がある場合では、ユーザーのその他の法的権利と、誰かが本規約に違反した場合にどうなるかについて説明します
                </li>
              </ul>
              <p>
                ユーザーは、Google
                のサービスを利用することにより、本規約に同意することになります。そのため、本規約の内容を理解しておくことが重要です。
              </p>
              <p>
                本規約に加えて、Google はプライバシー ポリシーも公開しています。プライバシー
                ポリシーは本規約とは独立した規定ですが、ユーザーが自身の情報を更新、管理、書き出し、削除する方法について理解を深めるためにもご一読されることをおすすめします。
              </p>
              <h2>年齢に関する要件</h2>
              <p>
                ユーザーが自分で Google アカウントを管理するための年齢要件を満たしていない場合、Google
                アカウントを使用するには親または保護者の方の許可を得なければなりません。本規約を、親または保護者の方と一緒に読んでください。
              </p>
              <p>
                親または保護者の方がお子様のサービスの利用を許可する場合、本規約はその親または保護者の方に適用され、サービス利用時のお子様の行動について責任を負うことになります。
              </p>
              <p>
                一部の Google
                サービスには追加の年齢要件が設けられており、それぞれのサービス固有の追加規約およびポリシーにその旨が記載されています。
              </p>
              <h2>ユーザーと Google の関係</h2>
              <p>
                本規約は、ユーザーと Google の関係を定義するためのものです。大まかに言うと、Google
                は本規約を遵守することに同意したユーザーに Google のサービスの利用を許可します。本規約には、Google
                のビジネスの仕組みと収益を生み出す方法が反映されています。 「Google」とは、Google LLC
                およびその関連会社を意味します。
              </p>
            </div>
          </template>
        </Modal>
      </div>
    </div>
  </section>
</template>
